// third party
import React, { FC, useState } from 'react'
import { Box, Typography } from '@mui/material'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import SendIcon from '@mui/icons-material/Send'
import Skeleton from '@mui/material/Skeleton'

// intra-app
import { Message, User } from '../../../models'
import { MessageMainItem } from '../components/MessageMainItem/MessageMainItem' // note: not picking up the index.ts in that directory for some reason
import { MessageList } from '../components/MessageList'
import { MessageListItem } from '../components/MessageListItem'
import { useGetMessageQuery, useGetMessagesQuery } from '../api/apiSlice'

// local
import './MessagePage.css'

const fakeMessages: Message[] = [
    {
        data: 'Have a great working week!',
        sentBy: 'Putri Tanjak',
        createTime: 0,
    },
    {
        data: 'This new landing page, What do you think?',
        sentBy: 'Ahmed Medi',
        createTime: 1,
    },
    { data: '(img)', sentBy: 'Ahmed Medi', createTime: 2 },
    { data: '(Audio)', sentBy: 'Milie Nose', createTime: 3 },
    { data: 'Ok maszeehh!', sentBy: 'MyFirstUser', createTime: 4 },
]

interface MessagePageProps {
    loggedInAs: User
}

export const MessagePage: FC<MessagePageProps> = ({ loggedInAs }) => {
    // const test = useGetMessageQuery('coolguy32')

    // TODO swap this state from index of selected to Message.sentBy, and then use that sentBy (when changed) to GET messages sentBy={user}.
    // reasoning: I want to switch GET Messages to instead be something like GET Threads where threads are tied to sentBy.
    // reasoning(cont): when this happens, the "message details" pane won't work right unless its messages list is a derived query from state change on the selected thread
    const [selectedListIndex, setSelectedListIndex] = useState<number>()

    interface FormState {
        newMessage: string
    }

    const [values, setValues] = React.useState<FormState>({
        newMessage: '',
    })

    const handleChange =
        (prop: keyof FormState) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value })
        }

    const handleSendMessage = () => {
        console.info(`Tried to send a new message!`, values.newMessage)
        console.log(
            'TODO: wipe input and send new message to API; maybe use MUI Snackbar as confirmation'
        )
        // link to it: https://mui.com/material-ui/react-snackbar/#customization
    }

    const handleListItemClick = (nextSelected: number) => {
        setSelectedListIndex(nextSelected)
    }

    return (
        <div className="message-page-root">
            <MessageList
                selectedIndex={selectedListIndex}
                onIndexChange={handleListItemClick}
            />
            <div className="message-main">
                <Typography variant="h3" sx={{ flex: 1 }}>
                    Design Team
                </Typography>
                <Paper
                    sx={{ flex: 10, display: 'flex', flexDirection: 'column' }}
                >
                    <Grid container spacing={3}>
                        {fakeMessages.map((message) => {
                            return (
                                <MessageMainItem
                                    message={message}
                                    loggedInAs={loggedInAs}
                                    key={message.createTime}
                                />
                            )
                        })}
                    </Grid>
                </Paper>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FormControl
                        sx={{ width: '90%', height: '70%' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="message-input">
                            Your messages...
                        </InputLabel>
                        <OutlinedInput
                            id="message-input"
                            type={'text'}
                            value={values.newMessage}
                            onChange={handleChange('newMessage')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="send message"
                                        onClick={handleSendMessage}
                                        edge="end"
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Send New Message"
                        />
                    </FormControl>
                </Box>
            </div>
        </div>
    )
}
