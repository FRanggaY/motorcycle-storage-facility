import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("theme") ?? 'dark',
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", state.mode);
    },
  }
})

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
