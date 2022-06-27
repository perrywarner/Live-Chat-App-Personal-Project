import React from 'react'
import './App.css'
import UsersList from './UsersList'

export const App = () => {
    return (
        <div className="App">
            {/* Default Create-React-App splash screen with nice spinny React logo :) */}
            <header className="App-header">
                <UsersList />
            </header>
        </div>
    )
}