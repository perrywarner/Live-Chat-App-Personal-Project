// third party
import React, { FC, useState } from 'react'
import List from '@mui/material/List';

// intra-app
import { Message, User } from '../../../models';
import { MessageMainItem } from '../components/MessageMainItem/MessageMainItem'; // note: not picking up the index.ts in that directory for some reason
import { MessageListItem } from '../components/MessageListItem';

// local
import './MessagePage.css';

const fakeMessages: Message[] = [
    { data: 'Have a great working week!', sentBy: 'Putri Tanjak', createTime: 0 },
    { data: 'This new landing page, What do you think?', sentBy: 'Ahmed Medi', createTime: 1 },
    { data: '(img)', sentBy: 'Ahmed Medi', createTime: 2 },
    { data: '(Audio)', sentBy: 'Milie Nose', createTime: 3 },
    { data: 'Ok maszeehh!', sentBy: 'FooBar', createTime: 4 },
];

interface MessagePageProps {
    loggedInAs: User;
}

export const MessagePage: FC<MessagePageProps> = ({ loggedInAs }) => {
    const [selectedListIndex, setSelectedListIndex] = useState<number>();

    const handleListItemClick = (nextIndex: number) => {
        setSelectedListIndex(nextIndex)
    }

    return (
        <div className='message-page-root'>
            <div className='message-list'>
                <div className='message-list-header'>
                    <h1>Messages</h1>
                    <p>(edit icon)</p>
                </div>
                <input placeholder='Search...'/>
                <List>
                    {fakeMessages.map((message, index) => {
                        return (
                            <MessageListItem message={message} selected={selectedListIndex === index} onClick={() => handleListItemClick(index)} key={index}/>
                        )
                    })}
                </List>
                {/* mockup shows "pinned" vs "all" messages, skipping "pinned" for now */}
            </div>
            <div className='message-main'>
                <div className='message-main-header'>
                    <h2>Design Team</h2>
                </div>
                <div className='message-main-body'>
                    {fakeMessages.map((message) => {
                        return <MessageMainItem message={message} loggedInAs={loggedInAs} key={message.createTime} />
                    })}
                </div>
                <footer className='message-main-footer'>
                    <input className='message-main-input' placeholder='Your messages...'/>
                </footer>
            </div>
        </div>
    )
}