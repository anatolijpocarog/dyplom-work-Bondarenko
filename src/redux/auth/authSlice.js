import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { loginThunk, logoutThunk, refreshThunk, signupThunk } from './thunk';

const initialState = {
  token: null,
  user: { email: null, name: null },
  authenticated: false,
  isloading: false,
  error: null,
};

const handlePending = state => {
  state.isloading = true;
  state.error = null;
};
const handleFulfilled = (state, { payload }) => {
  state.isloading = false;
  state.token = payload.token;
  state.authenticated = true;
  state.user = payload.user;
};
const handleError = (state, { payload }) => {
  state.isloading = false;
  state.error = payload;
};
const handlerefreshFulfilled = (state, { payload }) => {
  state.isloading = false;
  state.authenticated = true;
  state.user = payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(signupThunk.fulfilled, handleFulfilled)

      .addCase(loginThunk.fulfilled, handleFulfilled)

      .addCase(refreshThunk.fulfilled, handlerefreshFulfilled)

      .addCase(logoutThunk.fulfilled, () => initialState)

      .addMatcher(
        isAnyOf(
          logoutThunk.pending,
          signupThunk.pending,
          loginThunk.pending,
          refreshThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          logoutThunk.rejected,
          signupThunk.rejected,
          loginThunk.rejected,
          refreshThunk.rejected
        ),
        handleError
      ),
});

export const authReducer = authSlice.reducer;
