// third part
import React, { useState, useEffect } from 'react'

// intra-app
import { User } from '../../models'

export function UsersList() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getUsersAsync().then((userData) => {
            setUsers(userData)
            console.log('Users after async call: ' + users)
        })
        console.log('Users: ' + users)
    }, []) // effect hook that only fetches data when the component mounts, see https://www.robinwieruch.de/react-hooks-fetch-data/

    async function getUsersAsync() {
        let response = await fetch('/users')
        console.log('Response body: ' + response.body)
        let userData: User[] = await response.json()
        console.log(userData)
        return userData
    }

    return (
        <div>
            {/* Users list, populated from backend! Following https://daveceddia.com/create-react-app-express-backend/ , progress/guide location found if you ctrl-f "Open up client/src"*/}
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
                        key={user.id}
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
                                    return <li>{message.data}</li>
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

export default UsersList
