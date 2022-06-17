import { router } from '../app';
import { userData } from '../mockData';

export const usersRoute = router.get('/users', function (req, res) {
    res.json(userData);
});

export const createUser = router.put('/users', (req, res) => {
    // 0: deserialize request
    // 1: build new User based upon the { name: string } from request body
    // 2 (filter): since PUT is idempotent, check to see if a user exists with the given "name" from req body
    // 3a (if filter success): add new User to User store, then:
    // 3b (if filter success): return response HTTP 201 CREATED with body as the full User (with { id, sentMessages }) that was created
    // 4 (if filter error): return response HTTP 409 CONFLICT
})