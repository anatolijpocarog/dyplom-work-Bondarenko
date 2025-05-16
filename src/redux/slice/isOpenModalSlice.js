import { createSlice } from '@reduxjs/toolkit';

const isOpenModalSlice = createSlice({
  name: 'isOpenModal',
  initialState: false,
  reducers: {
    setIsOpenModal: (_, action) => action.payload,
  },
});

export const { setIsOpenModal } = isOpenModalSlice.actions;
export const isOpenModalReducer = isOpenModalSlice.reducer;
