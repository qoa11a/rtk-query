import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '~/types/user';
import { wait } from '~/utils/wait';

interface IUsersSlice {
  users: IUser[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IUsersSlice = {
  users: [],
  isLoading: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.hasError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

const URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
  const response = await fetch(URL);
  await wait(2000);
  return (await response.json()) as IUser[];
});

export default usersSlice.reducer;
