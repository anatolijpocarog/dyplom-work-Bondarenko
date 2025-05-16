import { createSelector } from '@reduxjs/toolkit';

const selectCars = state => state.cars;

export const selectIsLoading = createSelector(
  selectCars,
  cars => cars.isLoading
);

export const selectIsOpenModal = state => state.isOpenModal;
export const selectCarInfo = state => state.carInfo;
export const selectNextPage = state => state.nextPage;
export const selectFilter = state => state.filter;

export const selectCarsError = createSelector(selectCars, cars => cars.error);

export const selectCatalogCarsData = createSelector(
  selectCars,
  cars => cars.cars
);
export const selectFavorites = createSelector(
  selectCars,
  cars => cars.favorites
);
