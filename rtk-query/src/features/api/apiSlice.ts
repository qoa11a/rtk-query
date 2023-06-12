import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IPost } from '~/types/post';
import { IUser } from '~/types/user';
import { wait } from '~/utils/wait';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    fetchAllPosts: builder.query<IPost[], { userId: number | null }>({
      queryFn: async({ userId }, api, extraOptions, baseQuery) => {
        let URL = '/posts';

        if (userId) URL += `?userId=${userId}`;

        const response = await baseQuery(URL);
        const data = response.data as IPost[];
        await wait(2000);
        return { data };
      },
    }),
    fetchAllUsers: builder.query<IUser[], void>({
      queryFn: async(arg, api, extraOptions, baseQuery) => {
        const response = await baseQuery('/users');
        const data = response.data as IUser[];
        await wait(2000);
        return { data };
      },
    }),
    createPost: builder.mutation<IPost, Omit<IPost, 'id'>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      async onQueryStarted(post, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'fetchAllPosts',
            { userId: null }, (draft) => {
              draft.unshift({ id: Date.now(), ...post });
            }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useFetchAllUsersQuery,
  useCreatePostMutation,
} = apiSlice;
