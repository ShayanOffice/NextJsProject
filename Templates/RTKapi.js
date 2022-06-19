import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SqlUrl + 'api/' /* defined in next.config.js */,
    //process.env.NODE_ENV === 'production' ? `http://localhost:5000/`, : 'http://w.x.y.z:5000/',
    credentials: 'include',
  }),
  tagTypes: ['Certificates'],
  endpoints: (builder) => ({
    //    getXyz: builder.query({ query: (qry) => ({ url: `Certificate...?`,}), providesTags: ['Certificates'], }),
    //    xyz: builder.mutation({ query: (body) => ({ url: `Invitation-SetStatus`, method: 'POST', body, }), invalidatesTags: ['Certificates'],}),
  }),
});

export const {
  // Export hooks for usage in functional components, which are
  // Below export items must obey camelcase (prefixed with use & postfixed with either Query or Mutation in case)
  //useGetXyzQuery,
  //useXyzMutation,
} = Api;
