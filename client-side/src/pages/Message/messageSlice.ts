// third party
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// intra-app
import { Message, User } from '../../../../models'
import { RootState, AppThunk } from '../../state/store'
import { getMessages } from '../../api/message'

type RequestStatus = 'idle' | 'loading' | 'failed'

interface MessageState {
    total: Message[]
    filtered: Message[]
    filteredBy?: User['name']
    requestStatus: {
        total: RequestStatus
    }
}

const initialState: MessageState = {
    total: [],
    filtered: [],
    requestStatus: {
        total: 'idle',
    },
}

const filterByUsername = (
    messages: Message[],
    choice: MessageState['filteredBy']
) => {
    return messages.filter((message) => {
        return choice === message.from
    })
}

export const fetchTotalMessages = createAsyncThunk(
    'messages/getTotal',
    async () => {
        const resp = await getMessages()
        return resp
    }
)

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        changeMessageThread: (
            state,
            action: PayloadAction<MessageState['filteredBy']>
        ) => {
            const choice: MessageState['filteredBy'] = action.payload
            state.filteredBy = choice
            state.filtered = filterByUsername(state.total, choice)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTotalMessages.pending, (state) => {
                state.requestStatus.total = 'loading'
            })
            .addCase(fetchTotalMessages.fulfilled, (state, action) => {
                state.requestStatus.total = 'idle'

                const messages = action.payload
                if (Array.isArray(messages)) {
                    state.total = messages
                    state.filtered = filterByUsername(
                        messages,
                        state.filteredBy
                    )
                } else {
                    state.total = [messages]
                }
            })
            .addCase(fetchTotalMessages.rejected, (state) => {
                // note: seems like this code path is always getting called even if the network request seems to successfully resolve?
                state.requestStatus.total = 'failed'
            })
    },
})

export const { changeMessageThread } = messageSlice.actions

export const selectMessageState = (state: RootState) => state.messages

export default messageSlice.reducer
