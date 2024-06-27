import { User, Message, MessageCreateRequest } from '../../../models'
import { messageUrl } from './constants'

export const getMessages = (
    author?: User['name']
): Promise<Message | Message[]> => {
    const queryParams = author ? `?author=${author}` : ``
    const init: RequestInit = {
        /* "mode: 'no-cors'" handles error:
        Access to fetch at 'http://localhost:3001/messages' from origin 'http://localhost:3000' has been blocked by CORS policy: 
        No 'Access-Control-Allow-Origin' header is present on the requested resource. 
        If an opaque response serves your needs, 
        set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
        */
        mode: 'no-cors',
    }
    return fetch(messageUrl + queryParams, init).then(async (resp) => {
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`)
        }
        const data: Message[] = await resp.json()
        if (data.length === 1) {
            return data[0]
        } else return data
    })
}

export const sendMessage = (
    partial: MessageCreateRequest
): Promise<Message> => {
    const init: RequestInit = {
        method: 'POST',
        body: JSON.stringify(partial),
    }
    return fetch(messageUrl, init).then(async (resp) => {
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`)
        }
        const data: Message = await resp.json()
        return data
    })
}
