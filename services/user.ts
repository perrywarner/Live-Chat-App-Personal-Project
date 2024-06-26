import { randomInt } from 'crypto'
import { User, UserCreateRequest, Message } from '../models'
import { userData } from '../test/mockData'

export class UserService {
    users: Map<User['name'], User>

    constructor() {
        this.users = new Map(keyedUserData)
    }

    getList() {
        return Array.from(this.users.values())
    }

    create(submitted: UserCreateRequest) {
        const existing = this.users.get(submitted.name)
        if (!existing) {
            const newUser: User = {
                id: randomInt(0, 65536),
                name: submitted.name,
            }
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
