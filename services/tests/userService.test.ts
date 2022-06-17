import { UserCreateRequest } from "../../models";
import { UserService } from "../user"

describe('User Service', () => {
    let instance = new UserService();
    beforeEach(() => {
        instance = new UserService();
    });
    it('should be able to create users', () => {
        const mockSubmission: UserCreateRequest = {
            name: 'Mock Submitted User'
        };
        instance.create(mockSubmission);
        const created = instance.users.get(mockSubmission.name);
        expect(created).not.toBeUndefined();
    });
})