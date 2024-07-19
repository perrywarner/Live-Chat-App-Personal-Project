// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message } from '../../../models'
import { baseUrl, messageUrl } from './constants'

// Define our single API slice object
// (docs: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#api-slice-parameters)
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // "baseUrl": All of our requests will have URLs starting with 'http://localhost:3001'
    // "mode: 'no-cors'": note to self - DONT USE THIS ONE!!! Redux / RTK ends up thinking every single request is rejected because of this "opaque response" weirdness: https://stackoverflow.com/questions/36292537/what-is-an-opaque-response-and-what-purpose-does-it-serve
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], void>({
            query: () => ({ url: messageUrl, method: 'GET' }),
        }),
        getMessage: builder.query<Message, string>({
            query: (username) => ({
                url: messageUrl,
                method: 'GET',
                params: { sentBy: username },
            }),
        }),
    }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetMessagesQuery, useGetMessageQuery } = apiSlice
