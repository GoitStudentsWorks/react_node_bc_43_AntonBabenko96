import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  refresh,
  addToFavorites,
  removeFromFavorites,
  getUserInfo,
  updateUserInfo,
} from './auth-operations';

const initialState = {
  user: {},
  isLogin: false,
  loading: false,
  error: null,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};


const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
       
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = {};
        state.error = null;
        state.isLogin = false;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refresh.pending, state => {
        state.loading = true;
        state.error = null;
        state.isLogin = false;
      })
      .addCase(refresh.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(refresh.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isLogin = false;
      })
      .addCase(addToFavorites.pending, handlePending)
      .addCase(addToFavorites.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addToFavorites.rejected, handleRejected)
      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, handleRejected)

      .addCase(getUserInfo.pending, handlePending)
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(getUserInfo.rejected, handleRejected)
      .addCase(updateUserInfo.pending, handlePending)
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        console.log('🆑  payload:', payload);

        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(updateUserInfo.rejected, handleRejected);
  },
});

export default authSlice.reducer;
