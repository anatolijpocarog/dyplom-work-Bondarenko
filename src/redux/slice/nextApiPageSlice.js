import { createSlice } from '@reduxjs/toolkit';

const nextApiPageSlice = createSlice({
  name: 'nextPage',
  initialState: 2,
  reducers: {
    setNextPage: (_, action) => action.payload,
  },
});
export const { setNextPage } = nextApiPageSlice.actions;
export const nextPageReducer = nextApiPageSlice.reducer;
