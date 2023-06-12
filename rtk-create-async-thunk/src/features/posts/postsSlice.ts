import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '~/types/post';
import { wait } from '~/utils/wait';
import { AppDispatch, RootState } from '~/app/store';

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
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.hasError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });
  },
});

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchAllPosts = createAsyncThunk<
  IPost[],
  undefined,
  {
    dispatch: AppDispatch,
    state: RootState,
  }
>('posts/fetchAllPosts', async (_, { getState }) => {
  const { posts: { selectedUserId } } = getState();
  let URL = API_URL;

  if (selectedUserId) URL += `?userId=${selectedUserId}`;

  const response = await fetch(URL);
  await wait(2000);
  return await response.json();
});

export const createPost = createAsyncThunk('posts/createPost', async (post: Omit<IPost, 'id'>) => {
  const body = JSON.stringify(post);
  const response = await fetch(API_URL, {
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return (await response.json()) as IPost;
});

export const { setUserId } = postsSlice.actions;

export default postsSlice.reducer;
