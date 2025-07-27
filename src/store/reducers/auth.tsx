import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export enum CONNECTION_STATE {
  'NOT_CONNECTED',
  'CONNECTED',
  'INIT',
}

const TOKEN_STORAGE_NAME = 'saferuntoken';

type AuthState = {
  token: string;
  state: CONNECTION_STATE;
  login: {
    open: boolean;
    loading: boolean;
    basic: {
      user: string;
      password: string;
    };
  };
};

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_STORAGE_NAME),
  state: CONNECTION_STATE.INIT,
  login: {
    open: false,
    loading: false,
    basic: {
      user: '',
      password: '',
    },
  },
};

export const basicLogin = createAsyncThunk(
  'loginbasic',
  async (config: { user: string; password: string }) => {
    const base64 = window.btoa(`${config.user}:${config.password}`);

    const response = await axios.get(process.env.TOKEN_API_PATH, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    return response.data;
  },
);

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoginOpen(state, action) {
      state.login.open = action.payload;
    },
    setBasicUser(state, action) {
      state.login.basic.user = action.payload;
    },
    setBasicPassword(state, action) {
      state.login.basic.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(basicLogin.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(basicLogin.fulfilled, (state, action) => {
        state.login.loading = false;
        state.token = action.payload.token;
        state.login.open = false;
        state.login.basic.password = null;
        localStorage.setItem(TOKEN_STORAGE_NAME, action.payload.token);
      })
      .addCase(basicLogin.rejected, (state) => {
        state.login.loading = false;
      });
  },
});

export default auth.reducer;

export const { setToken, setLoginOpen, setBasicUser, setBasicPassword } =
  auth.actions;
