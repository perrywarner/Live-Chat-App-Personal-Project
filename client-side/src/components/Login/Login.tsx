import React, {
    useState,
    FC,
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
} from 'react'

import { User } from '../../../../models'
import { useUser } from '../../hooks/user'
import { IconSubmit } from '../IconSubmit'
import { List, ListItem, TextField, Typography } from '@mui/material'

interface LoginProps {
    onLogin: (selectedUser: User) => void
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
    const { users, setTryPutUser, isLoading } = useUser()
    const [newUserName, setNewUserName] = useState<string>()

    const handleListItemClick: MouseEventHandler<HTMLLIElement> = (e) => {
        const selectedUsername = e.currentTarget.textContent
        const match = users?.find((user) => {
            return user.name === selectedUsername
        })
        if (match) {
            onLogin(match)
        }
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewUserName(e.target.value)
    }

    const handleCreate = () => {
        setTryPutUser(newUserName)
    }

    useEffect(() => {
        console.table(users)
    }, [users])

    return (
        <div>
            <Typography variant="h2">Choose a user:</Typography>
            {!isLoading.get && users ? (
                <List>
                    {users.map((user) => (
                        <ListItem onClick={handleListItemClick} key={user.name}>
                            {user.name}
                        </ListItem>
                    ))}
                    <ListItem>
                        <TextField onChange={handleInputChange} /> &nbsp;
                        <IconSubmit
                            isLoading={isLoading.put}
                            onClick={handleCreate}
                        />
                    </ListItem>
                </List>
            ) : (
                <Typography variant="h2">Loading...</Typography>
            )}
        </div>
    )
}
