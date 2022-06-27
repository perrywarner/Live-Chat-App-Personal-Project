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
            sentBy: 'coolguy32',
        }
        instance.create(mockSubmission)
        const created = instance.queryBy('coolguy32')
        expect(created).not.toBeUndefined()
    })
    // pretty sure this is bugged as of 6/22 @ 1:16pm.
    // if do Postman GET Messages -> POST Message -> GET Messages, the second GET Messages doesn't have the new message in it
    it.todo(
        'after creating Message, the state of the Map of messages should be updated to contain the new Message'
    )
    it.todo('Message should not be able to create if invalid (sentBy) User')
})
