// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const redditApi = createApi({
    reducerPath: 'redditApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
    endpoints: (builder) => ({
      getPageByName: builder.query({
        query: (name) => `r/${name}.json`,
      }),
      
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPageByNameQuery } = redditApi