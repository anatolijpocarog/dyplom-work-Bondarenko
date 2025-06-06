import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { requestLogin,
  requestLogout,
  requestRefreshUser,
  requestSignup,
  setToken, } from '../../services/api';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const response = await requestLogin(body);
      return response;
    } catch (error) {
      toast.error("Sorry, but such an account doesn't exist.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (body, thunkAPI) => {
    try {
      const authData = await requestSignup(body);
      return authData;
    } catch (error) {
      toast.error('Sorry, this account already exists.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const authData = await requestRefreshUser();
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await requestLogout();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
