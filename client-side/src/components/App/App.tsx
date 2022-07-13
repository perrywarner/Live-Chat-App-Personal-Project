// third party
import React, { useState } from 'react'

// intra app
import { User } from '../../../../models'
import { MessagePage } from '../../pages/MessagePage'
import { Login } from '../Login'
import { Sidenav } from '../Sidenav'

// local
import './App.css'

export const App = () => {
    const [user, setUser] = useState<User>()

    const handleLogin = (selectedUser: User) => {
        setUser(selectedUser)
    }

    return (
        <div className="App">
            <div className="Sidenav-container">
                <Sidenav />
            </div>
            <div className="Main-container">
                {!user ? (
                    <header className="App-header">
                        <Login onLogin={handleLogin} />
                    </header>
                ) : (
                    <MessagePage loggedInAs={user} />
                )}
            </div>
        </div>
    )
}
