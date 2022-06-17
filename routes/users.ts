import { router, User } from '../app'
import { userData } from '../mockData'
import { UserCreateRequest } from '../models'

export const usersRoute = router.get('/users', function (req, res) {
    res.json(userData)
})

export const createUser = router.put('/users', (req, res) => {
    // deserialize request
    if (req.body.hasOwnProperty('name')) {
        const submittedUser: UserCreateRequest = { name: req.body.name };
        
        // build new User based upon the { name: string } from request body
        const createResult = User.create(submittedUser);

        // (filter): since PUT is idempotent, check to see if a user exists with the given "name" from req body
        // (filtering is automatically done in logic of User.create())
        if (createResult) {
            // (if filter success): add new User to User store, then:
            // (if filter success): return response HTTP 201 CREATED with body as the full User (with { id, sentMessages }) that was created
            return res.status(201).json(createResult);
        } else {
            console.log('returning status 409 from createUser')
            // (if filter error): return response HTTP 409 CONFLICT
            return res.status(409).send(`a user with name "${submittedUser.name}" already exists`);
        }
    } else {
        return res.status(400);
    }
})
