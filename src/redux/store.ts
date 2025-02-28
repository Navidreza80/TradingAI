import { configureStore } from '@reduxjs/toolkit';
import positionsReducer from './positionsSlice';

export const store = configureStore({
  reducer: {
    positions: positionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 