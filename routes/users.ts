import { router } from '../app';
import { User, Message } from '../models';

const messageData: Message[] = [
    {
        id: 0,
        data: 'Hello World!',
        sentBy: 'MyFirstUser',
        createTime: 1654888830
    },
    {
        id: 1,
        data: 'MyFirstUser, if you could stop yelling hello at the entire world every time this stuff starts up, that\'d be great',
        sentBy: 'coolguy32',
        createTime: 1654888832
    },
    {
        id: 2,
        data: 'Shut up! You\'re not my real dad!',
        sentBy: 'MyFirstUser',
        createTime: 1654888836
    },
]

const userData: User[] = [
    {
        id: 0,
        name: 'MyFirstUser',
        sentMessages: [messageData[0], messageData[2]]
    },
    {
        id: 1,
        name: 'coolguy32',
        sentMessages: [messageData[1]]
    },
];

export const usersRoute = router.get('/users', function (req, res, next) {
    res.json(userData);
});
