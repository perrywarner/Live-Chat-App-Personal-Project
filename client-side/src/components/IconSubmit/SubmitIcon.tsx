// third party
import React, { FC, } from 'react'

// local
import plusIcon from './icon-plus.svg';
import spinnerIcon from './icon-spinner.svg';

interface IconSubmitProps {
    isLoading: boolean;
    onClick: () => void;
}

export const IconSubmit: FC<IconSubmitProps> = ({ isLoading, onClick }) => {
    if (!isLoading) {
        return <img src={plusIcon} onClick={onClick} alt='Create Icon'/>
    } else {
        return <img src={spinnerIcon} alt='Loading Icon'/>
    }
}