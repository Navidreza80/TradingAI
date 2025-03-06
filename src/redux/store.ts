import { configureStore } from '@reduxjs/toolkit';
import positionsReducer from './positionsSlice';
import themeReducer from './themeSlice'

export const store = configureStore({
  reducer: {
    positions: positionsReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 