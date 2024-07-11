import { DataTypes, Sequelize } from 'sequelize'

export interface User {
    // App defined properties
    name: string

    // DB controlled properties
    id: string
    createdAt: string
    updatedAt: string
}

export const setupUserModel = async (dbConnection: Sequelize) => {
    // TODO in future: read about many more column options: https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
    const tableDefinition = dbConnection.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
    })

    // Create the table if it doesn't already exist. If it does exist, it is first dropped since I'm using { force: true }.
    await tableDefinition.sync({ force: true })
    // definition.drop(); // if I wanted to drop it, it'd be like so
    // TODO in future: since table creation or dropping can be destructive, consider https://sequelize.org/docs/v6/other-topics/migrations/ as a better alternative

    return tableDefinition
}

// create User is sent to API only with name attribute
export type UserCreateRequest = {
    name: User['name']
}
