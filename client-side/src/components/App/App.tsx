import React, { useState } from 'react'
import './App.css'
import { Login } from '../Login'
import { User } from '../../../../models';

export const App = () => {
    const [user, setUser] = useState<User>();

    const handleLogin = (selectedUser: User) => {
        setUser(selectedUser);
    }

    return (
        <div className="App">
            <header className="App-header">
                {!user ? <Login onLogin={handleLogin}/> : <p>logged in as {user.name}</p> /* TODO show Message GUI when logged in User*/}
            </header>
        </div>
    )
}