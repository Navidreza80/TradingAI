// Redux for state management
import { configureStore } from '@reduxjs/toolkit';
// Position Slice
import positionsReducer from './positionsSlice';
// Theme Slices
import themeReducer from './themeSlice'

// Function to configure redux store
export const store = configureStore({
  reducer: {
    positions: positionsReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 