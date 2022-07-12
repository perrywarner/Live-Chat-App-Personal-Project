// third party
import React, { FC } from 'react'

// intra-app
import { Message, User } from '../../../../models';

interface MessageMainItemProps {
    message: Message
    loggedInAs: User
}

export const MessageMainItem: FC<MessageMainItemProps> = ({ message, loggedInAs }) => {
    const sentBySelf = message.sentBy === loggedInAs.name;

    return (
        <div className='message-main-item'>
            <div className={sentBySelf ? 'message-from-self' : 'message-from-others'}>
                <strong>{sentBySelf ? `You (logged in as ${loggedInAs.name})`: message.sentBy}</strong>
                <p>{message.data}</p>
            </div>
        </div>
    )
}
