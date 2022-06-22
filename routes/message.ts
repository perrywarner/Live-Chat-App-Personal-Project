import { router, Message } from '../app'
import { messageData } from '../mockData'
import { MessageCreateRequest } from '../models'

export const messagesRoute = router.get('/messages', (req, res) => {
    res.json(messageData);
})

// TODO increase strictness and error handling when submitted.sentBy doesn't match an entry in Users
export const createMessage = router.post('/messages', (req, res) => {
    console.info('req body', req.body);
    if (req.body.hasOwnProperty('data') && req.body.hasOwnProperty('sentBy')) {
        const submittedMessage: MessageCreateRequest = req.body;
        const createResult = Message.create(submittedMessage);
        if (createResult) {
            return res.status(201).json(createResult);
        } else {
            return res.status(400);
        }
    } else {
        return res.status(400);
    }
})