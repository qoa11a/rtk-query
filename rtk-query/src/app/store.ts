import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '~/features/posts/postsSlice';

import { apiSlice } from '~/features/api/apiSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
