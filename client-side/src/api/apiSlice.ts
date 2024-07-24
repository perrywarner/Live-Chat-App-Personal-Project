import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message } from '../../../models'
import { DOMAIN_ROOT, messageUrl } from './constants'

// Define our single API slice object
// (docs: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#api-slice-parameters)
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: DOMAIN_ROOT }),
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], void>({
            query: () => ({ url: messageUrl, method: 'GET' }),
        }),
        getMessage: builder.query<Message, string>({
            query: (username) => ({
                url: messageUrl,
                method: 'GET',
                params: { from: username },
            }),
        }),
    }),
})

export const { useGetMessagesQuery, useGetMessageQuery } = apiSlice
