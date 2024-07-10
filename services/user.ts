import { randomInt } from 'crypto'
import { User, UserCreateRequest, Message } from '../models'
import { userData } from '../test/mockData'
import { UserTable } from '../app'

export class UserService {
    users: Map<User['name'], User>

    constructor() {
        this.users = new Map(keyedUserData)
    }

    getList() {
        console.log('User table DB result: ')
        return Array.from(this.users.values())
    }

    async create(submitted: UserCreateRequest) {
        const existing = this.users.get(submitted.name); // not necessary if relying on the DB uniqueness constraint
        if (!existing) {
            const newUser: User = {
                id: String(randomInt(0, 65536)),
                name: submitted.name,
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString()
            }
            // info: if I wanted to create an instance here but not save it until later, I could do a table.build() here -> table.save() later.
            // Reference: https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
            const newDbUser = await UserTable.create({ name: submitted.name })
            console.log('created new user in DB: ', newDbUser.toJSON())
            this.users.set(submitted.name, newUser)
            return newUser
        } else {
            return false
        }
    }
}

// explicit type 'readonly (readonly [number, User])[]' is ugly but it needs to be there to give TS more confidence about the data we're passing to construct the new Map().
// * Reason: implicit TS type inference thinks keyedUserData: (number | User)[][] but this throws errors in new Map(keyedUserData).
// * Error: Argument of type '(number | User)[][]' is not assignable to parameter of type 'readonly (readonly [number, User])[]'. Type '(number | User)[]' is not assignable to type 'readonly [number, User]'.
const keyedUserData: readonly (readonly [string, User])[] = userData.map(
    (user) => {
        return [user.name, user]
    }
)
