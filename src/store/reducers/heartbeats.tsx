import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Heartbeat = {
  _id: string;
  type: 'blocked' | 'heartbeat' | 'custom_event' | 'info';
  timestamp: string;
  url: string;
  user: {
    id: string;
    name: string;
    email: string;
    department: string;
    chromeProfile?: {
      email: string;
      id: string;
    };
  };
  system: {
    platform: string;
    userAgent?: string;
    localIPs: string[];
    fingerprint: {
      uuid: string;
    };
    lastUpdated: string;
  };
  agentId: string;
  // Optional fields based on type
  blockedText?: string; // for type: 'blocked'
  userInput?: string; // for type: 'info'
  eventData?: string; // for type: 'custom_event'
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type HeartbeatsState = {
  heartbeats: Heartbeat[];
  loading: boolean;
  error: string | null;
};

export const fetchHeartbeats = createAsyncThunk(
  'heartbeats/fetchHeartbeats', 
  async () => {
    const response = await axios.get('/heartbeats');
    return response.data;
  }
);

const initialState: HeartbeatsState = {
  heartbeats: [],
  loading: false,
  error: null,
};

const heartbeats = createSlice({
  name: 'heartbeats',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeartbeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeartbeats.fulfilled, (state, action) => {
        state.loading = false;
        state.heartbeats = action.payload?.data || [];
      })
      .addCase(fetchHeartbeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch heartbeats';
      });
  },
});

export default heartbeats.reducer;

export const { clearError } = heartbeats.actions;