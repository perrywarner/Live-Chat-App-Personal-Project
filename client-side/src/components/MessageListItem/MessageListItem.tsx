// third party
import React, { FC } from 'react'

// intra-app
import { Message } from '../../../../models';

interface MessageListItemProps {
    message: Message;
}

export const MessageListItem: FC<MessageListItemProps> = ({ message }) => {

    return (
        <div className='message-list-item' key={message.createTime}>
            <p>{message.sentBy}</p>
            <p>{message.data}</p>
        </div>
    )
}
