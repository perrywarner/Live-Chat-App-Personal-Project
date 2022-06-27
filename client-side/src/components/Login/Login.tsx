// third part
import React, { useState, useEffect } from 'react'

// intra-app
import { User } from '../../../../models'

export const Login = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getUsersAsync().then((userData) => {
            setUsers(userData)
        })
    }, []) // effect hook that only fetches data when the component mounts, see https://www.robinwieruch.de/react-hooks-fetch-data/

    async function getUsersAsync() {
        const response = await fetch('/users')
        const userData: User[] = await response.json()
        return userData
    }

    return (
        <div>
            <h1>Users</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {users.map((user) => (
                    <div
                        key={user.name}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <p>Name: {user.name}</p>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <p>Messages:</p>
                            <ul>
                                {user.sentMessages.map((message) => {
                                    // TODO display message timestamp via message.createTime
                                    return <li key={message.createTime}>{message.data}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* crappy divider: <div style={{ width: '3rem', height: '1px', color: 'black', paddingBottom: '1rem'}} /> */
