import { randomInt } from 'crypto'
import { Message, MessageCreateRequest, MessageGetQueryParams } from '../models'
import { messageData } from '../test/mockData'

export class MessageService {
    messages: Map<Message['createTime'], Message>

    constructor() {
        this.messages = new Map(keyedMessageData)
    }

    create(submitted: MessageCreateRequest) {
        // TODO don't create message if author not in Users
        const newMessage: Message = {
            id: randomInt(0, 65536),
            data: submitted.data,
            author: submitted.author,
            createTime: Date.now(),
        }
        this.messages.set(newMessage.createTime, newMessage)
        return newMessage
    }

    // potential TODO: maybe add queryBy Message['data']
    queryBy({ author }: MessageGetQueryParams) {
        let response: Message[] = [];

        if (author) {
            response = Array.from(this.messages.values()).filter((message) => {
                return author === message.author
            })
        }

        return response;
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
