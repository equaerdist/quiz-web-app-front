import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { CreateQuizDto, GetQuizDto, ProblemDetails } from "../../Dtos/Quiz";
import axios from "axios";
import { AxiosError } from "axios";
import config from "../../wrappers/config";
import { RootState } from "../../store";
import { transformQuizes } from "../../wrappers/dataTransform";

const quizAdapter = createEntityAdapter({
  selectId: (quiz: GetQuizDto) => quiz.id,
});

export const createQuizAsync = createAsyncThunk(
  "quiz/createQuiz",
  async (data: CreateQuizDto, { signal, rejectWithValue }) => {
    let token = axios.CancelToken.source();
    signal.addEventListener("abort", () => token.cancel());
    try {
      const response = await axios.post(`${config.api}quiz`, data, {
        headers: { "Content-Type": "application/json" },
        cancelToken: token.token,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      let responseError = error as AxiosError;

      if (!responseError.response) throw error;
      return rejectWithValue(responseError.response.data);
    }
  }
);

export const getInitialQuizes = createAsyncThunk(
  "quiz/getInitialQuizes",
  async (arg: void, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    const {
      pageSize,
      sortParam,
      sortOrder,
      filter,
      filterValue,
      raiting,
      page,
      recommendations,
    } = store.quiz;
    try {
      let response = await axios.get(
        `${config.api}quiz?pageSize=${pageSize}
      &page=${page}
      &sortOrder=${sortOrder}
      &sortParam=${sortParam}
      &filter=${filter}
      &filterValue=${filterValue}
      &raiting=${raiting}
      &recommendations=${recommendations}`
      );
      return response.data.map(transformQuizes);
    } catch (error) {
      let responseError = error as AxiosError;

      if (!responseError.response) throw error;
      return thunkApi.rejectWithValue(responseError.response.data);
    }
  }
);

export const getErrorFromResponse = (responseError: ProblemDetails) => {
  if (responseError.errors) {
    let error = "";
    responseError.errors.forEach((item) => error.concat(item.detail, "\n"));
    return error;
  } else return responseError.title;
};

export const onPagedQuizes = createAsyncThunk(
  "quiz/quizesPaged",
  async (arg: void, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    const {
      pageSize,
      sortParam,
      sortOrder,
      filter,
      filterValue,
      raiting,
      page,
      recommendations,
    } = store.quiz;
    try {
      let response = await axios.get(
        `${config.api}quiz?pageSize=${pageSize}
      &page=${page}
      &sortOrder=${sortOrder}
      &sortParam=${sortParam}
      &filter=${filter}
      &filterValue=${filterValue}
      &raiting=${raiting}
      &recommendations=${recommendations}`
      );
      return response.data.map(transformQuizes);
    } catch (error) {
      let responseError = error as AxiosError<ProblemDetails>;
      if (!responseError.response) throw error;
      return thunkApi.rejectWithValue(responseError.response.data);
    }
  }
);

export const { selectAll } = quizAdapter.getSelectors(
  (state: RootState) => state.quiz
);
const initialState = quizAdapter.getInitialState({
  loading: "idle",
  page: 1,
  pageSize: 10,
  sortParam: "id",
  sortOrder: "asc",
  filter: "raiting",
  filterValue: 0,
  raiting: true,
  recommendations: true,
  selected: "",
});

const quiz = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialQuizes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getInitialQuizes.fulfilled, (state, action) => {
        quizAdapter.setMany(state, action.payload);
        state.loading = "idle";
      })
      .addCase(getInitialQuizes.rejected, (state, action) => {
        state.loading = "Произошла ошибка";
        if (action.meta.rejectedWithValue) {
          let responseError = action.payload as ProblemDetails;
          state.loading = getErrorFromResponse(responseError);
        } else {
          if (action.meta.aborted) state.loading = "idle";
          else if (action.error.message) state.loading = action.error.message;
        }
      })
      .addCase(onPagedQuizes.fulfilled, (state, action) => {
        quizAdapter.addMany(state, action.payload);
        state.loading = "idle";
      })
      .addDefaultCase(() => {});
  },
});
export const { setSelected } = quiz.actions;
export default quiz.reducer;
