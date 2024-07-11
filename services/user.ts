import { UserCreateRequest, setupUserModel } from '../models'
import { Model, ModelCtor, Sequelize } from 'sequelize'

export class UserService {
    usersTable: ModelCtor<Model<any, any>> | undefined

    constructor(dbConnection: Sequelize) {
        // Set up our Sequelize Models which are basically our DB Tables. More info at https://sequelize.org/docs/v6/core-concepts/model-basics/#concept
        console.log('\n✨ Creating the User Table ✨')
        setupUserModel(dbConnection)
            .then((table) => {
                this.usersTable = table
                console.log('✅ Successfully created the User Table')
            })
            .catch((error) => {
                throw new Error('Failed to create the User table:', error)
            })
    }

    async getList() {
        if (!this.usersTable) {
            throw new Error(
                'Tried to create a User but usersTable has not yet been initialized'
            )
        }
        const userListQueryResult = await this.usersTable.findAll()
        const userList = userListQueryResult.map((queryResult) => {
            return queryResult.toJSON()
        })
        console.log('User list query result: ', userList)
        return userList
    }

    async create(submitted: UserCreateRequest) {
        // info: if I wanted to create an instance here but not save it until later, I could do a table.build() here -> table.save() later.
        // Reference: https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
        if (!this.usersTable) {
            throw new Error(
                'Tried to create a User but usersTable has not yet been initialized'
            )
        }
        const newUserDbEntry = await this.usersTable.create({
            name: submitted.name,
        })
        const newUser = newUserDbEntry.toJSON()
        console.log('Created new User: ', newUser)
        return newUser
    }
}
