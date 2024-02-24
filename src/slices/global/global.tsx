import { createSlice } from "@reduxjs/toolkit";
type globalState = {
  connection: null | signalR.HubConnection;
  isMobile: boolean;
};
const initialState: globalState = {
  connection: null,
  isMobile: window.innerWidth <= 780,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setConnection(state, action) {
      state.connection = action.payload;
    },
    setMobile(state, action) {
      state.isMobile = action.payload;
    },
  },
});
export const { setConnection, setMobile } = globalSlice.actions;
export default globalSlice.reducer;
