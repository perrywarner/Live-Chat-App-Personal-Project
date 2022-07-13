// third party
import React, { FC } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// intra-app
import { Message, User } from '../../../../models';

interface MessageMainItemProps {
    message: Message
    loggedInAs: User
}

export const MessageMainItem: FC<MessageMainItemProps> = ({ message, loggedInAs }) => {
    const sentBySelf = message.sentBy === loggedInAs.name;

    return (
        <Grid item xs={8} sx={{ alignSelf: sentBySelf ? 'flex-end' : 'flex-start' }}>
            <Typography variant='subtitle1'>
                {sentBySelf ? `You (logged in as ${loggedInAs.name})`: message.sentBy}
            </Typography>
            <Typography variant='body1'>
                {message.data}    
            </Typography>
        </Grid>
    )
}
