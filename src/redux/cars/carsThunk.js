import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestCatatlogCars } from '../../services/api';

export const catatlogCarsThunk = createAsyncThunk(
  'cars/catatlogCars',
  async ({ page }, thunkAPI) => {
    try {
      const response = await requestCatatlogCars(page);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
