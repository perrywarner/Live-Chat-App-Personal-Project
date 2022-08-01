// third party
import React, { FC, useState, useEffect } from 'react'
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

// intra-app
import { Message, User } from '../../../models'
import { MessageMainItem } from '../components/MessageMainItem/MessageMainItem' // note: not picking up the index.ts in that directory for some reason
import { MessageListItem } from '../components/MessageListItem'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { useGetMessagesQuery } from '../api/apiSlice'

// local
import './MessagePage.css'
import {
    selectMessageState,
    fetchTotalMessages,
    changeMessageThread,
} from './messageSlice'

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
    const state = useAppSelector(selectMessageState)
    const dispatch = useAppDispatch()

    console.info('Total Redux Messages: ', state.total)

    // // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // // BUGGED HERE
    // // * data fetch is ok: message data fetch on page load is executing and resolving w/ HTTP 200 OK & data
    // // * RTK Query needs debugging: unfortunately it looks like apiSlice.getMessages action: "rejected" is always the result even when the request is supposed to fulfill..
    // // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // // NOTE
    // // when bug is fixed (the Redux state is syncing with the API results and showing on the UI),
    // // I can pick up where I left off with RTK Query tutorial at https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#displaying-posts-with-queries

    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetMessagesQuery()

    console.info('Total RTK Messages: ', messages)

    if (error) {
        console.error('RTK get messages error: ', error)
    }

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

    const handleListItemClick = (nextIndex: number) => {
        setSelectedListIndex(nextIndex)
    }

    return (
        <div className="message-page-root">
            <div className="message-list">
                <div className="message-list-header">
                    <h1>Messages</h1>
                    <p>(edit icon)</p>
                </div>
                <input placeholder="Search..." />
                <List>
                    {/* Uncomment "fakeMessages" block to sanity check the UI against the UI embedded w/ Redux logic */}
                    {/* {fakeMessages.map((message, index) => {
                        return (
                            <MessageListItem
                                message={message}
                                selected={selectedListIndex === index}
                                onClick={() => handleListItemClick(index)}
                                key={index}
                            />
                        )
                    })} */}
                    {isLoading ? (
                        <MessageListItem
                            message={{
                                data: 'Loading...',
                                sentBy: 'Loading...',
                                createTime: 0,
                            }}
                            selected={false}
                            onClick={() => {
                                console.log('loading clicked')
                            }}
                        />
                    ) : null}
                    {isError ? (
                        <MessageListItem
                            message={{
                                data: 'Error!',
                                sentBy: 'Error!',
                                createTime: 0,
                            }}
                            selected={false}
                            onClick={() => {
                                console.log('Error! clicked')
                            }}
                        />
                    ) : null}
                    {isSuccess
                        ? messages.map((message, index) => {
                              return (
                                  <MessageListItem
                                      message={message}
                                      selected={selectedListIndex === index}
                                      onClick={() => handleListItemClick(index)}
                                      key={index}
                                  />
                              )
                          })
                        : null}
                </List>
                {/* mockup shows "pinned" vs "all" messages, skipping "pinned" for now */}
            </div>
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
