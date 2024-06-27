import { User } from './User'

export interface Message {
    id: number
    data: string
    author: User['name']
    createTime: number
}

// Messages are sent to the API with only the data and author.
// Then, the API enriches with metadata like createTime.
export interface MessageCreateRequest {
    data: Message['data']
    author: Message['author']
}

export interface MessageGetQueryParams {
    author?: Message['author']
}