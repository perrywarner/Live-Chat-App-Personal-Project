import { User } from './User'

export interface Message {
    id: number
    data: string
    sentBy: User['name']
    createTime: number
}

// Messages are sent to the API with only the data and sentBy.
// Then, the API enriches with metadata like createTime.
export interface MessageCreateRequest {
    data: Message['data']
    sentBy: Message['sentBy']
}
