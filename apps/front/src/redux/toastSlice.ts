import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info';

type ToastState = {
  message: string | null;
  type: ToastType;
};

const initialState: ToastState = {
  message: null,
  type: 'info',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type?: ToastType }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
    },
    clearToast: (state) => {
      state.message = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
