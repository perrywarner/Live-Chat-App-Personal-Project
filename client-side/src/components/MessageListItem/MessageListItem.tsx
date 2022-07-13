// third party
import React, { FC } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// intra-app
import { Message } from '../../../../models';

interface MessageListItemProps {
    message: Message;
    selected: ListItemButtonProps['selected'];
    onClick: ListItemButtonProps['onClick'];
}

export const MessageListItem: FC<MessageListItemProps> = ({ message, selected, onClick }) => {

    return (
        <ListItem key={message.createTime}>
            <ListItemButton selected={selected} onClick={onClick}>
                <ListItemText primary={message.data} secondary={message.sentBy} />
            </ListItemButton>
        </ListItem>
    )
}
