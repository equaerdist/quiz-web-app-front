import { configureStore } from "@reduxjs/toolkit";
import * as modal from "../slices/modal/modal";
import * as transition from "../slices/transition/transition";
import * as quiz from "../slices/quiz/quiz";
import * as auth from "../slices/auth/auth";
import * as global from "../slices/global/global";
const store = configureStore({
  reducer: {
    modal: modal.default,
    transition: transition.default,
    quiz: quiz.default,
    auth: auth.default,
    global: global.default,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
