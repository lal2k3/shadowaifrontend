import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type RisksState = {
  loading: boolean;
  risks: string[];
  scanSources: string[];
};

const initialState: RisksState = {
  loading: false,
  risks: null,
  scanSources: null,
};

export const loadScanSources = createAsyncThunk('loadscansources', async () => {
  const response = await axios.get('/repo/list');

  return response.data;
});

export const loadRisks = createAsyncThunk('loadrisks', async () => {
  const response = await axios.get('/user/token');

  return response.data;
});

const risks = createSlice({
  name: 'risks',
  initialState,
  reducers: null,
  extraReducers: (builder) => {
    builder
      .addCase(loadScanSources.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadScanSources.fulfilled, (state, action) => {
        state.loading = false;
        state.scanSources = action.payload;
      })
      .addCase(loadScanSources.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loadRisks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadRisks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(loadRisks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default risks.reducer;

/*export const { setToken } = auth.actions; */
