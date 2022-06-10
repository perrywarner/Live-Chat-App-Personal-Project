import { User } from "./User";

export interface Message {
    // TODO: make ID globally unique
    id: number;
    data: string;
    sentBy: User['name'];

    // TODO: add some sort of date parser since this should be a Unix Timestamp (integer). Might need Luxon or something
    // note: can use https://www.unixtimestamp.com/ until I get the date parser set up
    createTime: number; 
}
