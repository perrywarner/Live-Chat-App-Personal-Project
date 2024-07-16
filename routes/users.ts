import { router, User } from '../app'
import { UserCreateRequest } from '../models'

// TODO get by name
export const usersRoute = router.get('/users', async function (req, res) {
    console.log('called user get')
    res.json(await User.getList())
})

export const createUser = router.put('/users', async (req, res) => {
    if (req.body.hasOwnProperty('name')) {
        const submittedUser: UserCreateRequest = { name: req.body.name }

        // build new User based upon the { name: string } from request body
        console.log('called user put')
        const createResult = await User.create(submittedUser)

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
