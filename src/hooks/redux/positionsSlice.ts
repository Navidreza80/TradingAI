// Redux for state management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types for type safety
import { Position } from '../../types';

// Position interface
interface PositionsState {
  positions: Position[];
}

// Position initial value
const initialState: PositionsState = {
  positions: [],
};

// Function to create slice
const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<Position>) => {
      state.positions.push(action.payload);
    },
    removePosition: (state, action: PayloadAction<string>) => {
      state.positions = state.positions.filter(position => position.id !== action.payload);
    },
  },
});

export const { addPosition, removePosition } = positionsSlice.actions;
export default positionsSlice.reducer; 