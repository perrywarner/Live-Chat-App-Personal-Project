// third party
import React, { FC } from 'react'

// intra-app
import { Icon, BaseIconProps } from '../Icon'

// local
import homeSvg from './icons/house-solid.svg'
import messageSvg from './icons/comment-dots-solid.svg'
import settingsSvg from './icons/gear-solid.svg'
import userSvg from './icons/user-regular.svg'
import './Options.css'

interface SidenavOptionProps {
    isSelected: boolean
    onClick: BaseIconProps['onClick']
}

export const HomeOption: FC<SidenavOptionProps> = ({ isSelected, onClick }) => {
    return (
        <div
            className={
                isSelected ? 'sidenav-option-selected' : 'sidenav-option'
            }
        >
            <Icon
                sourceSvg={homeSvg}
                onClick={onClick}
                accessibleText="Home Icon"
            />
        </div>
    )
}

export const MessageOption: FC<SidenavOptionProps> = ({
    isSelected,
    onClick,
}) => {
    return (
        <div
            className={
                isSelected ? 'sidenav-option-selected' : 'sidenav-option'
            }
        >
            <Icon
                sourceSvg={messageSvg}
                onClick={onClick}
                accessibleText="Message Icon"
            />
        </div>
    )
}

export const SettingsOption: FC<SidenavOptionProps> = ({
    isSelected,
    onClick,
}) => {
    return (
        <div
            className={
                isSelected ? 'sidenav-option-selected' : 'sidenav-option'
            }
        >
            <Icon
                sourceSvg={settingsSvg}
                onClick={onClick}
                accessibleText="Settings Icon"
            />
        </div>
    )
}

export const UserOption: FC<SidenavOptionProps> = ({ isSelected, onClick }) => {
    return (
        <div
            className={
                isSelected ? 'sidenav-option-selected' : 'sidenav-option'
            }
        >
            <Icon
                sourceSvg={userSvg}
                onClick={onClick}
                accessibleText="User Icon"
            />
        </div>
    )
}
