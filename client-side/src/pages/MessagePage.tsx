// third party
import React, { FC } from 'react'

// intra-app
import { Message, User } from '../../../models';

// local
import './MessagePage.css';

interface MessagePageProps {
    loggedInAs: User;
}

export const MessagePage: FC<MessagePageProps> = ({ loggedInAs }) => {
    return (
        <div className='message-page-root'>
            <div className='message-list'>
                <div className='message-list-header'>
                    <h1>Messages</h1>
                    <p>(edit icon)</p>
                </div>
                <input placeholder='Search...'/>
                {fakeData.map((message) => {
                    return (
                        <div className='message-list-item' key={message.createTime}>
                            <p>{message.sentBy}</p>
                            <p>{message.data}</p>
                        </div>
                    )
                })}
                {/* mockup shows "pinned" vs "all" messages, skipping "pinned" for now */}
            </div>
            <div className='message-main'>
                <div className='message-main-header'>
                    <h2>Design Team</h2>
                </div>
                <div className='message-main-body'>
                    <div className='message-main-item'>
                        <div className='message-from-others'>
                            <strong>Putri Tanjak</strong>
                            <p>Have a great working week!</p>
                        </div>
                    </div>
                    <div className='message-main-item'>
                        <div className='message-from-others'>
                            <strong>Ahmed Medi</strong>
                            <p>This new landing page, What do you think?</p>
                        </div>
                    </div>
                    <div className='message-main-item'>
                        <div className='message-from-others'>
                            <strong>Ahmed Medi</strong>
                            <p>(img)</p>
                        </div>
                    </div>
                    <div className='message-main-item'>
                        <div className='message-from-others'>
                            <strong>Milie Nose</strong>
                            <p>(Audio)</p>
                        </div>
                    </div>
                    <div className='message-main-item'>
                        <div className='message-from-self'>
                            <strong>You (logged in as {loggedInAs.name})</strong>
                            <p>Ok maszeehh!</p>
                        </div>
                    </div>
                </div>
                <div className='message-main-footer'>
                    <input placeholder='Your messages...'/>
                </div>
            </div>
        </div>
    )
}

const fakeData: Message[] = [{
    data: 'foo',
    sentBy: 'test1',
    createTime: 0
}, {
    data: 'bar',
    sentBy: 'test2',
    createTime: 1
}, {
    data: 'baz',
    sentBy: 'test3',
    createTime: 2
}]