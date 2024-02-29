import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthData, GetUserDto, ProblemDetails, UserDto } from "../../Dtos/Quiz";
import axios, { AxiosError } from "axios";
import config from "../../wrappers/config";
import { getErrorFromResponse } from "../quiz/quiz";
import { transformGetUserDto } from "../../wrappers/dataTransform";
import { TokenProvider } from "../../wrappers/utils";
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
      const response = await axios.post(`${config.api}auth`, info, {
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

export const fetchForRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (arg: void, thunkApi) => {
    try {
      const response = await axios.get(`${config.api}refreshToken`);
      return response.data;
    } catch (error) {
      let axiosError = error as AxiosError;
      if (!axiosError.response) throw Error;
      return thunkApi.rejectWithValue(axiosError.response.data);
    }
  }
);

export const fetchForGetUserData = createAsyncThunk(
  "auth/getUserData",
  async (arg: void, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.api}user`);
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
      .addCase(fetchForGetUserData.pending, (state) => {
        state.condition = "loading";
      })
      .addCase(fetchForGetUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.condition = "idle";
        state.authentificated = true;
      })
      .addCase(fetchForGetUserData.rejected, (state, action) => {
        state.authentificated = false;
        if (action.meta.rejectedWithValue) {
          let responseError = action.payload as ProblemDetails;
          state.condition = getErrorFromResponse(responseError);
        } else {
          if (action.meta.aborted) state.condition = "idle";
          else if (action.error.message) state.condition = action.error.message;
        }
      })
      .addCase(fetchForUserEnter.fulfilled, (state, action) => {
        state.authentificated = true;
        let payload = action.payload as AuthData;
        TokenProvider.SetToken(payload.token);
        TokenProvider.SetRefreshToken(payload.refreshToken);
        TokenProvider.SetExpirationTime(payload.expires);
      })
      .addCase(fetchForRefreshToken.pending, (state) => {
        state.condition = "idle";
      })
      .addCase(fetchForRefreshToken.fulfilled, (state, action) => {
        state.condition = "idle";
        let payload = action.payload as AuthData;
        TokenProvider.SetExpirationTime(payload.expires);
        TokenProvider.SetToken(payload.token);
      })
      .addCase(fetchForRefreshToken.rejected, (state, action) => {
        if (action.meta.rejectedWithValue) {
          var payload = action.payload as ProblemDetails;
          state.condition = payload.title;
          TokenProvider.ResetTokens();
        } else state.condition = "Сервер не доступен";
      })
      .addDefaultCase(() => {});
  },
});

export const { setAuthentificated } = slice.actions;
export default slice.reducer;
