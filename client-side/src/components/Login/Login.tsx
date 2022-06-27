// third part
import React, { useState, useEffect, FC, ChangeEventHandler, MouseEventHandler } from 'react'

// intra-app
import { User } from '../../../../models'

// local
import plusIcon from './icon-plus.svg';

interface LoginProps {
    onLogin: (selectedUser: User) => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
    const [users, setUsers] = useState<User[]>()
    const [newUserName, setNewUserName] = useState<string>();

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

    const handleListItemClick: MouseEventHandler<HTMLLIElement> = (e) => {
        const selectedUsername = e.currentTarget.textContent;
        const match = users?.find((user) => {
            return user.name === selectedUsername;
        })
        if (match) {
            onLogin(match);
        }
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewUserName(e.target.value);
    }

    const handleCreate = () => {
        // TODO send PUT User to /users
        // * after PUT success, setUsers([...users, newUsername]). add <li> for new user that should be clickable in the same way the others are
        // * after PUT failure, (TODO what do I want to do for error handling?)
        // * bonus: loading icon / spinner while request in flight
        console.log(`Plus icon (Create Icon) clicked. newUserName currently is ${newUserName}`)
    }

    return (
        <div>
            <h2>Choose a user:</h2>
            {users ? 
                <ul>
                    {users.map((user) => (
                        <li onClick={handleListItemClick} key={user.name}>{user.name}</li>
                    ))}
                    <li>
                        <input onChange={handleInputChange}/> &nbsp;
                        <img src={plusIcon} onClick={handleCreate} alt='Create User'/>
                    </li>
                </ul>
            : <p>Loading...</p>}
        </div>
    )
}

/* crappy divider: <div style={{ width: '3rem', height: '1px', color: 'black', paddingBottom: '1rem'}} /> */
