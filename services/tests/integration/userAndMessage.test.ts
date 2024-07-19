import { Message, User, UserCreateRequest } from '../../../models'
import { UserService } from '../../user'
import { MessageCreateRequest } from '../../../models'
import { MessageService } from '../../message'
import { messageData } from '../../../test/mockData'

describe('Integration: User Service with Message Service', () => {
    let userInstance = new UserService()
    let messageInstance = new MessageService()
    beforeEach(() => {
        userInstance = new UserService()
        messageInstance = new MessageService()
    })

    test('after User is created, it should have an empty list of sentMessages', () => {
        const mockSubmission: UserCreateRequest = {
            name: 'Mock Submitted User',
        }
        const expected: User = { ...mockSubmission, sentMessages: [] }
        const result = userInstance.create(mockSubmission)
        expect(result).toStrictEqual(expected)
    })

    test('when Message is created, it should have been sentBy a valid User', () => {
        const mockSubmission: MessageCreateRequest = {
            data: 'Mock Submitted Message',
            sentBy: 'coolguy32',
        }

        const existingUser = userInstance.users.get(mockSubmission.sentBy)
        expect(existingUser).not.toBeUndefined()

        const expected: Message[] = [
            messageData[1],
            {
                ...mockSubmission,
                sentBy: existingUser!.name,
                createTime: Date.now(),
            },
        ]

        messageInstance.create(mockSubmission)
        const result = messageInstance.queryBy(mockSubmission.sentBy)
        expect(result).toStrictEqual(expected)
    })

    // can't figure out how to do this test. I explain why in comments above "/utils/runtimeSync:addNewMessageToUserauthor()"
    // TODO revisit in future since it'd protect against a bug I saw & fixed (title was "[BE] [FIX] "sentMessages" of User in GET Users does not contain new Messages that get created")
    it.todo(
        'after creating a Message, the corresponding User that the Message was sentBy should have sentMessages that contains the new Message'
    )
})
