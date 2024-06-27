// third party
import React, { FC } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// intra-app
import { Message, User } from '../../../../models'

interface MessageMainItemProps {
    message: Message
    loggedInAs: User
}

export const MessageMainItem: FC<MessageMainItemProps> = ({
    message,
    loggedInAs,
}) => {
    const authorSelf = message.author === loggedInAs.name

    return (
        <Grid
            item
            xs={8}
            sx={{ alignSelf: authorSelf ? 'flex-end' : 'flex-start' }}
        >
            <Typography variant="subtitle1">
                {authorSelf
                    ? `You (logged in as ${loggedInAs.name})`
                    : message.author}
            </Typography>
            <Typography variant="body1">{message.data}</Typography>
        </Grid>
    )
}
