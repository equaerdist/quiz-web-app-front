import { createSlice } from "@reduxjs/toolkit";
type globalState = {
  connection: null | signalR.HubConnection;
};
const initialState: globalState = {
  connection: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setConnection(state, action) {
      state.connection = action.payload;
    },
  },
});
export const { setConnection } = globalSlice.actions;
export default globalSlice.reducer;
