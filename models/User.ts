import { Message } from './Message'

export interface User {
    id: number
    name: string
}

// create User is sent to API only with name attribute
export type UserCreateRequest = {
    name: User['name']
}
