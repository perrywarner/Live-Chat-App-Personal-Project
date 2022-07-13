// third party
import React, { FC, useState } from 'react'

// local
import {
    HomeOption,
    MessageOption,
    SettingsOption,
    UserOption,
} from './Options'
import './Sidenav.css'

type SidenavIcon = 'Home' | 'Message' | 'Settings' | 'User'

export const Sidenav: FC = () => {
    const [selectedIcon, setSelectedIcon] = useState<SidenavIcon>('Message')

    const handleClick = (choice: SidenavIcon) => {
        setSelectedIcon(choice)
    }

    return (
        <nav className="sidenav">
            <div className="sidenav-icons">
                <HomeOption
                    isSelected={selectedIcon === 'Home'}
                    onClick={() => handleClick('Home')}
                />
                <div className="sidenav-icons-selectpage">
                    <MessageOption
                        isSelected={selectedIcon === 'Home'}
                        onClick={() => handleClick('Message')}
                    />
                    <SettingsOption
                        isSelected={selectedIcon === 'Home'}
                        onClick={() => handleClick('Settings')}
                    />
                </div>
                <UserOption
                    isSelected={selectedIcon === 'Home'}
                    onClick={() => handleClick('User')}
                />
            </div>
            <div className="sidenav-user">
                <strong>User Icon</strong>
            </div>
        </nav>
    )
}
