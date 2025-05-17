import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './cars/carsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { isOpenModalReducer } from './slice/isOpenModalSlice';
import { carInfoReducer } from './slice/carInfoSlice';
import { nextPageReducer } from './slice/nextApiPageSlice';
import { filterReducer } from './slice/filterSlice';
import { authReducer } from './auth/authSlice';

const carsConfig = {
  key: 'cars',
  storage,
  whitelist: ['favorites'],
};

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  cars: persistReducer(carsConfig, carsReducer),
  isOpenModal: isOpenModalReducer,
  carInfo: carInfoReducer,
  nextPage: nextPageReducer,
  filter: filterReducer,
  auth: persistReducer(authConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
