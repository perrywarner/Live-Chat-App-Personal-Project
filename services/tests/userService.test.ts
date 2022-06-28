import { UserCreateRequest } from '../../models'
import { UserService } from '../user'

describe('User Service', () => {
    let instance = new UserService()
    beforeEach(() => {
        instance = new UserService()
    })
    it.todo('should initialize with a Map of Users when they already exist')
    it('should be able to create user', () => {
        const mockSubmission: UserCreateRequest = {
            name: 'Mock Submitted User',
        }
        const result = instance.create(mockSubmission)
        expect(result).not.toBeFalsy();
    })
    it('should append User to the list of Users after successfully creating a User', () => {
        const mockSubmission: UserCreateRequest = {
            name: 'Mock Submitted User',
        }
        instance.create(mockSubmission)
        const created = instance.users.get(mockSubmission.name)
        expect(created).not.toBeUndefined()
    })
})
