import React from 'react'
import './App.css'
import { UsersList } from './components/UsersList/UsersList'

export const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <UsersList />
            </header>
        </div>
    )
}