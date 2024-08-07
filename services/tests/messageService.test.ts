import { MessageCreateRequest } from '../../models'
import { MessageService } from '../message'

describe('Message Service', () => {
    let instance = new MessageService()
    beforeEach(() => {
        instance = new MessageService()
    })
    it.todo('should initialize with a Map of Messages when they already exist')
    it.todo('should be able to retrieve the list of messages')
    it('should be able to create Message', () => {
        const mockSubmission: MessageCreateRequest = {
            data: 'Mock Submitted Message',
            from: 'coolguy32',
            to: 'Testuser229',
        }
        instance.create(mockSubmission)
        const created = instance.queryBy({
            from: 'coolguy32',
            to: 'Testuser229',
        })
        expect(created).not.toBeUndefined()
    })
    it.todo(
        'should create new Message with a createTime that is Unix timestamp of the current moment'
    )
    // pretty sure this is bugged as of 6/22 @ 1:16pm.
    // if do Postman GET Messages -> POST Message -> GET Messages, the second GET Messages doesn't have the new message in it
    it.todo(
        'after creating Message, the state of the Map of messages should be updated to contain the new Message'
    )
})
