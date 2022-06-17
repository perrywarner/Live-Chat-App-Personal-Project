import { Message } from "./Message"

export interface User {
    name: string;
    sentMessages: Message[];
}

// create User is sent to API only with name attribute
export type UserCreateRequest = { 
    name: User['name'];
}