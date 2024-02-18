import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserDto, ProblemDetails, UserDto } from "../../Dtos/Quiz";
import axios, { AxiosError } from "axios";
import config from "../../wrappers/config";
import { getErrorFromResponse } from "../quiz/quiz";
import { transformGetUserDto } from "../../wrappers/dataTransform";
type authState = {
  authentificated: boolean;
  currentUser: GetUserDto | null;
  condition: string;
};

const initialState: authState = {
  authentificated: false,
  currentUser: null,
  condition: "idle",
};

export const fetchForUserRegistration = createAsyncThunk(
  "auth/registerUser",
  async (info: UserDto, thunkApi) => {
    try {
      const response = await axios.post(`${config.api}auth/register`, info, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      let responseError = error as AxiosError;
      if (!responseError.response) throw error;
      return thunkApi.rejectWithValue(responseError.response.data);
    }
  }
);

export const fetchForUserEnter = createAsyncThunk(
  "auth/userEnter",
  async (info: UserDto, thunkApi) => {
    try {
      const response = await axios.post(`${config.api}auth/token`, info, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      let responseError = error as AxiosError;
      if (!responseError.response) throw error;
      return thunkApi.rejectWithValue(responseError.response.data);
    }
  }
);

export const fetchForAuthentificationCheck = createAsyncThunk(
  "auth/checkAuthentification",
  async (arg: void, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.api}auth/check`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      let axiosError = error as AxiosError;
      if (!axiosError.status) throw error;
      return rejectWithValue(axiosError.status);
    }
  }
);

export const fetchForGetUserData = createAsyncThunk(
  "auth/getUserData",
  async (arg: void, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.api}user`, {
        withCredentials: true,
      });
      return transformGetUserDto(response.data);
    } catch (error) {
      let axiosError = error as AxiosError;
      if (!axiosError.status) throw error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentificated: (state, action) => {
      state.authentificated = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForAuthentificationCheck.pending, (state) => {
        state.condition = "loading";
      })
      .addCase(fetchForAuthentificationCheck.fulfilled, (state) => {
        state.authentificated = true;
        state.condition = "idle";
      })
      .addCase(fetchForAuthentificationCheck.rejected, (state, action) => {
        state.authentificated = false;
        state.condition = "idle";
        if (!action.meta.rejectedWithValue)
          state.condition = action.error.message ?? "Произошла ошибка";
      })
      .addCase(fetchForGetUserData.pending, (state) => {
        state.condition = "loading";
      })
      .addCase(fetchForGetUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.condition = "idle";
      })
      .addCase(fetchForGetUserData.rejected, (state, action) => {
        if (action.meta.rejectedWithValue) {
          let responseError = action.payload as ProblemDetails;
          state.condition = getErrorFromResponse(responseError);
        } else {
          if (action.meta.aborted) state.condition = "idle";
          else if (action.error.message) state.condition = action.error.message;
        }
      })
      .addCase(fetchForUserEnter.fulfilled, (state) => {
        state.authentificated = true;
      })
      .addDefaultCase(() => {});
  },
});

export const { setAuthentificated } = slice.actions;
export default slice.reducer;
