// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message } from '../../../models'
import { baseUrl, messageUrl } from './constants'

// Define our single API slice object
// (docs: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#api-slice-parameters)
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with 'http://localhost:3001'
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], void>({
            query: () => ({ url: messageUrl, method: 'GET', mode: 'no-cors' }),
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

//////////////////////
// NOTE TO FUTURE SELF
// * gave up on trying to get base Redux & Thunks to work for my Message API
// * now, working from: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#defining-an-api-slice
//////////////////////

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetMessagesQuery } = apiSlice
