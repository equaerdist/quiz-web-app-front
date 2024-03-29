import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import config from "../../wrappers/config";
import { CreateQuizDto, ProblemDetails } from "../../Dtos/Quiz";
import { createQuizAsync, getErrorFromResponse } from "../quiz/quiz";

type modalState = {
  current: string;
  mode: string;
  playersAmount: number;
  transferData: string;
  backPath: string;
  condition: string;
  progress: number | null;
  details: string;
};
const initialState: modalState = {
  current: "createQuiz",
  mode: "single",
  playersAmount: 2,
  transferData: "Ошибка",
  backPath: "",
  details: "Что-то пошло не так",
  condition: "error",
  progress: null,
};

type changeData = {
  current: string;
  sessionData?: string;
  backPath?: string;
  details?: string;
};

const loadImageOnServerAsync = createAsyncThunk(
  "modal/uploadImage",
  async (image: File, thunkApi) => {
    const response = await axios.post(
      `${config.api}image`,
      { type: 0, imageFile: image },
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          thunkApi.dispatch(setProgress(e.progress ? e.progress * 100 : 100));
        },
      }
    );
    thunkApi.dispatch(setProgress(null));
    return response.data;
  }
);

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    change(state, action: PayloadAction<changeData>) {
      state.current = action.payload.current;
      if (action.payload.sessionData)
        state.transferData = action.payload.sessionData;
      if (action.payload.backPath) state.backPath = action.payload.backPath;
      if (action.payload.details) state.details = action.payload.details;
    },
    setPlayersAmount: (state, action: PayloadAction<number>) => {
      state.playersAmount = action.payload;
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
    setCondition: (state, action: PayloadAction<string>) => {
      state.condition = action.payload;
    },
    setProgress: (state, action: PayloadAction<number | null>) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuizAsync.fulfilled, (state) => {
        state.condition = "idle";
        state.current = "complete";
        state.transferData = "Поздравляем! Квиз создан.";
        state.details = "Вы просто молодец!";
      })
      .addCase(createQuizAsync.rejected, (state, action) => {
        state.condition = "error";
        state.current = "complete";
        state.transferData = "Что-то пошло не так..";
        if (action.payload) {
          let responseError = action.payload as ProblemDetails;
          state.details = getErrorFromResponse(responseError);
        } else state.details = action.error.message ?? "Попробуйте снова";
      })
      .addCase(createQuizAsync.pending, (state) => {
        state.condition = "loading";
      })

      .addDefaultCase(() => {});
  },
});
export const { change, setPlayersAmount, setMode, setProgress, setCondition } =
  slice.actions;
export { createQuizAsync, loadImageOnServerAsync };
export default slice.reducer;
