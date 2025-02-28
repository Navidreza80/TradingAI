import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '../types';

interface PositionsState {
  positions: Position[];
}

const initialState: PositionsState = {
  positions: [],
};

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