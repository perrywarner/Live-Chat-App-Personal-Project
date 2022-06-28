// third party
import React, { useState, FC, ChangeEventHandler, MouseEventHandler, useEffect } from 'react'

// intra-app
import { User } from '../../../../models'
import { useUser } from '../../hooks/user';
import { IconSubmit } from '../IconSubmit';

interface LoginProps {
    onLogin: (selectedUser: User) => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
    const { users, setTryPutUser, isLoading  } = useUser();
    const [newUserName, setNewUserName] = useState<string>();

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
        setTryPutUser(newUserName);
    }

    useEffect(() => {
        console.table(users);
    }, [users])

    return (
        <div>
            <h2>Choose a user:</h2>
            {!isLoading.get && users ? 
                <ul>
                    {users.map((user) => (
                        <li onClick={handleListItemClick} key={user.name}>{user.name}</li>
                    ))}
                    <li>
                        <input onChange={handleInputChange}/> &nbsp;
                        <IconSubmit isLoading={isLoading.put} onClick={handleCreate} />
                    </li>
                </ul>
            : <p>Loading...</p>}
        </div>
    )
}

/* crappy divider: <div style={{ width: '3rem', height: '1px', color: 'black', paddingBottom: '1rem'}} /> */
