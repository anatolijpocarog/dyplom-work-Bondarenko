import { createSlice } from '@reduxjs/toolkit';

const carInfoSlice = createSlice({
  name: 'carInfo',
  initialState: [],
  reducers: {
    setCarInfo: (_, action) => action.payload,
  },
});
export const { setCarInfo } = carInfoSlice.actions;
export const carInfoReducer = carInfoSlice.reducer;
