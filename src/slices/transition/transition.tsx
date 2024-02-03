import { createSlice } from "@reduxjs/toolkit";

const initialState = { current: "" };

const transition = createSlice({
  name: "transition",
  initialState,
  reducers: {
    goTo: (state, action) => {
      state.current = action.payload;
    },
  },
});
export const { goTo } = transition.actions;
export default transition.reducer;
