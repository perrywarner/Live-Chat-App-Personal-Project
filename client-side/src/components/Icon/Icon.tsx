// third party
import React, { FC } from 'react'

export interface BaseIconProps {
    sourceSvg: string
    accessibleText: string
    onClick?: () => void
}

export const Icon: FC<BaseIconProps> = ({
    sourceSvg,
    accessibleText,
    onClick,
}) => {
    return <img src={sourceSvg} onClick={onClick} alt={accessibleText} />
}
