// third party
import React, { useState } from 'react'

// intra app
import { User } from '../../../../models'
import { MessagePage } from '../../pages/MessagePage'
import { Login } from '../Login'
import { Sidenav } from '../AppBar'

// local
import './App.css'

export const App = () => {
    const [user, setUser] = useState<User>()

    const handleLogin = (selectedUser: User) => {
        setUser(selectedUser)
    }

    const handleAppbarLoginClick = () => {
        console.log(
            'TODO: route to Login Page (when get around to extracting to that)'
        )
    }

    return (
        <>
            <Sidenav
                loggedIn={Boolean(user)}
                onLoginClick={handleAppbarLoginClick}
            />
            <div className="Main-container">
                {!user ? (
                    <header className="App-header">
                        <Login onLogin={handleLogin} />
                    </header>
                ) : (
                    <MessagePage loggedInAs={user} />
                )}
            </div>
        </>
    )
}
