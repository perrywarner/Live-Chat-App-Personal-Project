import { Message } from "./Message"

export interface User {
    id: number;
    name: string;
    sentMessages: Message[];
}
