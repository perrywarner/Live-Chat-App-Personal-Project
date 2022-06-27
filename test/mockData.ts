import { User, Message } from '../models'

export const messageData: Message[] = [
    {
        data: 'Hello World!',
        sentBy: 'MyFirstUser',
        createTime: 1654888830,
    },
    {
        data: "MyFirstUser, if you could stop yelling hello at the entire world every time this stuff starts up, that'd be great",
        sentBy: 'coolguy32',
        createTime: 1654888832,
    },
    {
        data: "Shut up! You're not my real dad!",
        sentBy: 'MyFirstUser',
        createTime: 1654888836,
    },
]

export const userData: User[] = [
    {
        name: 'MyFirstUser',
        sentMessages: [messageData[0], messageData[2]],
    },
    {
        name: 'coolguy32',
        sentMessages: [messageData[1]],
    },
]
