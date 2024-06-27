import { User, Message } from '../models'

export const messageData: Message[] = [
    {
        id: 1,
        data: 'Hello World!',
        author: 'MyFirstUser',
        createTime: 1654888830,
    },
    {
        id: 2,
        data: "MyFirstUser, if you could stop yelling hello at the entire world every time this stuff starts up, that'd be great",
        author: 'coolguy32',
        createTime: 1654888832,
    },
    {
        id: 3,
        data: "Shut up! You're not my real dad!",
        author: 'MyFirstUser',
        createTime: 1654888836,
    },
]

export const userData: User[] = [
    {
        id: 1,
        name: 'MyFirstUser',
    },
    {
        id: 2,
        name: 'coolguy32',
    },
]
