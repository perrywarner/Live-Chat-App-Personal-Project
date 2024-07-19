// third party
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Provider } from 'react-redux'

// intra app
import { User } from '../../../../models'
import { MessagePage } from '../../pages/Message/MessagePage'
import { store } from '../../state/store'
import { Login } from '../../pages/Login'
import { AppBar } from '../AppBar'

// intra app - redux example (TODO get rid of this)
import ReduxDemo from '../../redux-CRA-example/App'
import { demoStore } from '../../redux-CRA-example/app/store'

// local
import './App.css'

export const App = () => {
    const [user, setUser] = useState<User>()
    const [showRedux, setShowRedux] = useState(false)

    const handleLogin = (selectedUser: User) => {
        setUser(selectedUser)
    }

    const handleAppbarLoginClick = () => {
        console.log(
            'TODO: route to Login Page (when get around to extracting to that)'
        )
    }

    const handleReduxExampleClick = () => {
        setShowRedux(true)
    }

    if (showRedux) {
        return (
            <p style={{ textAlign: 'center' }}>
                Uncomment line 41-43 of App.tsx to check out demo. <br /> I
                Would have this stuff uncommented but Redux devtools, etc. are
                bugged due to multiple stores and providers in the app. <br />{' '}
                TODO need to consolidate the stores.
            </p>
            // <Provider store={demoStore}>
            //     <ReduxDemo />
            // </Provider>
        )
    } else {
        return (
            <Provider store={store}>
                <AppBar
                    loggedIn={Boolean(user)}
                    onLoginClick={handleAppbarLoginClick}
                />
                <div className="Main-container">
                    {!user ? (
                        <header className="App-header">
                            <Login onLogin={handleLogin} />
                            <Button
                                onClick={handleReduxExampleClick}
                                variant="contained"
                            >
                                View Redux Example
                            </Button>
                        </header>
                    ) : (
                        <MessagePage loggedInAs={user} />
                    )}
                </div>
            </Provider>
        )
    }
}
