import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { catatlogCarsThunk } from './carsThunk';

const initialState = {
  cars: [],
  isLoading: false,
  error: null,

  favorites: [],
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};
const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.authenticated = true;
  state.cars = state.cars.concat(payload);
};
const handleError = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        car => car.id !== action.payload
      );
    },
  },

  extraReducers: builder =>
    builder
      .addCase(catatlogCarsThunk.fulfilled, handleFulfilled)

      .addMatcher(isAnyOf(catatlogCarsThunk.pending), handlePending)

      .addMatcher(isAnyOf(catatlogCarsThunk.rejected), handleError),
});

export const carsReducer = carsSlice.reducer;
export const { addToFavorites, removeFromFavorites } = carsSlice.actions;
