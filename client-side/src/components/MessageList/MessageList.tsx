// third party
import React, { FC } from 'react'
import List from '@mui/material/List'
import Skeleton from '@mui/material/Skeleton'
import { Box, Input, Stack, Typography } from '@mui/material'

// intra-app
import { MessageListItem } from '../MessageListItem'
import { useGetMessagesQuery } from '../../api/apiSlice'

interface MessageListProps {
    selectedIndex?: number
    onIndexChange: (nextSelected: number) => void
}

export const MessageList: FC<MessageListProps> = ({
    selectedIndex,
    onIndexChange,
}) => {
    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
    } = useGetMessagesQuery() // TODO rework GET Messages to be GET Threads and THEN use GET messages from={user} to drill down

    return (
        // TODO replace style "flex: 1" with a <Grid container> and <Grid item xs={4}> combo in the immediate parent of where this <MessageList> gets composed in <MessagePage>
        <Stack sx={{ flex: 1 }}>
            <Stack direction={'row'}>
                <Typography variant="h1">Messages</Typography>
                <Typography variant="body1">(edit icon)</Typography>
            </Stack>
            <Input placeholder="Search..." />
            {isError ? (
                <Typography variant="h2">
                    Oops! Failed to load Messages ☹️
                </Typography>
            ) : null}
            {isLoading ? (
                // <Skeleton>'s dimensions are inferred by its children so child is a 100%H box - read https://mui.com/material-ui/react-skeleton/#inferring-dimensions
                <Skeleton>
                    <Box sx={{ height: '100%' }} />
                </Skeleton>
            ) : isSuccess && messages ? (
                // mockup shows "pinned" vs "all" messages, skipping "pinned" for now
                <List sx={{ flex: 'auto' }}>
                    {messages.map((message, index) => {
                        return (
                            <MessageListItem
                                message={message}
                                selected={selectedIndex === index}
                                onClick={() => onIndexChange(index)}
                                key={index}
                            />
                        )
                    })}
                </List>
            ) : null}
        </Stack>
    )
}
