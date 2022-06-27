import { router, User } from '../app'
import { userData } from '../test/mockData'
import { UserCreateRequest } from '../models'

export const usersRoute = router.get('/users', function (req, res) {
    res.json(userData)
})

export const createUser = router.put('/users', (req, res) => {
    if (req.body.hasOwnProperty('name')) {
        const submittedUser: UserCreateRequest = { name: req.body.name }

        // build new User based upon the { name: string } from request body
        const createResult = User.create(submittedUser)

        if (createResult) {
            return res.status(201).json(createResult)
        } else {
            return res
                .status(409)
                .send(`a user with name "${submittedUser.name}" already exists`)
        }
    } else {
        return res.status(400)
    }
})
