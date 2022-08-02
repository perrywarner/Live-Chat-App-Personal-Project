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
    // "mode: 'no-cors'": All requests deny CORS by default. *****NOTE: this might need to change if I deploy the app to AWS or if I do something like call some third party APIs in the future*****
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl, mode: 'no-cors' }),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], void>({
            query: () => ({ url: messageUrl, method: 'GET' }),
        }),
        // // The `getPosts` endpoint is a "query" operation that returns data
        // getPosts: builder.query({
        //     // The URL for the request is '/fakeApi/posts'
        //     query: () => '/posts',
        // // // Example 2: Query params
        //     query: (id) => ({ url: `post/${id}` }),
        // }),
    }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetMessagesQuery } = apiSlice
