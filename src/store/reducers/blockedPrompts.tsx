import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type BlockedPrompt = {
  _id: string;
  type: string;
  timestamp: string;
  url: string;
  user: {
    id: string;
    name: string;
    email: string;
    department: string;
    chromeProfile: {
      email: string;
      id: string;
    };
  };
  system: {
    platform: string;
    userAgent: string;
    localIPs: string[];
    fingerprint: {
      uuid: string;
    };
    lastUpdated: string;
  };
  agentId: string;
  blockedText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type BlockedPromptsState = {
  blockedPrompts: BlockedPrompt[];
  loading: boolean;
  error: string | null;
};

export const fetchBlockedPrompts = createAsyncThunk(
  'blockedPrompts/fetchBlockedPrompts', 
  async () => {
    const response = await axios.get('/heartbeats/blocked');
    return response.data;
  }
);

const initialState: BlockedPromptsState = {
  blockedPrompts: [],
  loading: false,
  error: null,
};

const blockedPrompts = createSlice({
  name: 'blockedPrompts',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlockedPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlockedPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.blockedPrompts = action.payload?.data || [];
      })
      .addCase(fetchBlockedPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blocked prompts';
      });
  },
});

export default blockedPrompts.reducer;

export const { clearError } = blockedPrompts.actions;