import { router, Message } from '../app'
import { MessageCreateRequest } from '../models'

export const messagesRoute = router.get('/messages', (req, res) => {
    if (req.query.hasOwnProperty('author')) {
        // "as" type assertion added because Express.req.query isn't typesafe (is "any")
        const typecastParams = req.query as { author: string }
        const queryResult = Message.queryBy({ author: typecastParams.author })
        if (queryResult !== undefined) {
            res.json(queryResult)
        } else res.json([])
    } else {
        res.json(Array.from(Message.messages.values()))
    }
})

// TODO increase strictness and error handling when submitted.author doesn't match an entry in Users
export const createMessage = router.post('/messages', (req, res) => {
    if (req.body.hasOwnProperty('data') && req.body.hasOwnProperty('author')) {
        const submittedMessage: MessageCreateRequest = req.body
        const createResult = Message.create(submittedMessage)
        if (createResult) {
            return res.status(201).json(createResult)
        } else {
            return res.status(400)
        }
    } else {
        return res.status(400)
    }
})
