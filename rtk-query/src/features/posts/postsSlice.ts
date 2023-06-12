import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '~/types/post';

interface IPostsSlice {
  posts: IPost[];
  selectedUserId: number | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IPostsSlice = {
  posts: [],
  selectedUserId: null,
  isLoading: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const { setUserId } = postsSlice.actions;

export default postsSlice.reducer;
