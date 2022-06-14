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

export const usersRoute = router.get('/users', function (req, res) {
    res.json(userData);
});

export const createUser = router.put('/users', (req, res) => {
    // 0: deserialize request
    // 1: build new User based upon the { name: string } from request body
    // 2 (filter): since PUT is idempotent, check to see if a user exists with the given "name" from req body
    // 3a (if filter success): add new User to User store, then:
    // 3b (if filter success): return response HTTP 201 CREATED with body as the full User (with { id, sentMessages }) that was created
    // 4 (if filter error): return response HTTP 409 CONFLICT
})