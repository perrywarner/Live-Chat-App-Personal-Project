import { randomInt } from 'crypto'
import {
    Message,
    MessageCreateRequest,
    MessageGetQueryParams,
    setupMessageModel,
} from '../models'
import { messageData } from '../test/mockData'
import { Model, ModelCtor, Sequelize } from 'sequelize'

export class MessageService {
    messages: Map<Message['createTime'], Message>
    messagesTable: ModelCtor<Model<any, any>> | undefined

    constructor(dbConnection: Sequelize) {
        this.messages = new Map(keyedMessageData)
        // Set up our Sequelize Models which are basically our DB Tables. More info at https://sequelize.org/docs/v6/core-concepts/model-basics/#concept
        console.log('\n✨ Creating the Message Table ✨')
        setupMessageModel(dbConnection)
            .then((table) => {
                this.messagesTable = table
                console.log('✅ Successfully created the Message Table')
            })
            .catch((error) => {
                throw new Error('Failed to create the Message table:', error)
            })
    }

    create(submitted: MessageCreateRequest) {
        // TODO don't create message if sentBy not in Users
        const newMessage: Message = {
            id: randomInt(0, 65536),
            data: submitted.data,
            sentBy: submitted.sentBy,
            createTime: Date.now(),
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
        }
        this.messages.set(newMessage.createTime, newMessage)
        return newMessage
    }

    // potential TODO: maybe add queryBy Message['data']
    queryBy({ sentBy }: MessageGetQueryParams) {
        let response: Message[] = []

        if (sentBy) {
            response = Array.from(this.messages.values()).filter((message) => {
                return sentBy === message.sentBy
            })
        }

        return response
    }

    /* WIP
    // currently the param 'createTime' is the only choice so could be seen as redundant,
    //  but I plan on adding other Message properties in the future and this way is adaptible to it
    sortBy(choice: 'createTime') {
        if (choice === 'createTime') {
            // .sort(((curr, next) => {
            //     const currTime = curr[0];
            //     const nextTime = next[0];
            //     if (typeof currTime === 'number' && typeof nextTime === 'number') {
            //         return currTime - nextTime
            //     }
            // }))
        } else return;
    }
    */
}

const keyedMessageData: readonly (readonly [number, Message])[] =
    messageData.map((message) => {
        return [message.createTime, message]
    })
