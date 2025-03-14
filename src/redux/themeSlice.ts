import { createSlice } from "@reduxjs/toolkit";

// Theme interface
interface ThemeState {
  isDarkMode: boolean;
}

// Theme initial state
const initialState: ThemeState = {
  isDarkMode: true,
};

// Function to create theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      document.documentElement.classList.toggle("dark");
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
