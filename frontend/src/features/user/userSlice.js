import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser,fetchLoggedInUser} from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
  
};

export const updateUserByAsync = createAsyncThunk(
  'user/updateUser',
  async (updateData) => {
    const response = await updateUser(updateData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {      
      state.value += 1;
    },
   
  },

  extraReducers: (builder) => {
    builder
    
      .addCase(updateUserByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
