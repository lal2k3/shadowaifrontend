import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type HeartbeatsByType = {
  count: number;
  type: string;
};

export type TopAIUser = {
  count: number;
  userName: string;
  userEmail: string;
  department: string;
  userId: string;
};

export type TopBlockedUser = {
  count: number;
  userName: string;
  userEmail: string;
  department: string;
  userId: string;
};

export type TopPlatform = {
  count: number;
  platform: string;
};

export type DepartmentStats = {
  count: number;
  department: string;
};

type HeartbeatWidgetsState = {
  heartbeatsByType: HeartbeatsByType[];
  topAIUsers: TopAIUser[];
  topBlockedUsers: TopBlockedUser[];
  topPlatforms: TopPlatform[];
  departmentStats: DepartmentStats[];
  loading: {
    byType: boolean;
    topUsers: boolean;
    topBlocked: boolean;
    platforms: boolean;
    departments: boolean;
  };
  errors: {
    byType: string | null;
    topUsers: string | null;
    topBlocked: string | null;
    platforms: string | null;
    departments: string | null;
  };
};

export const fetchHeartbeatsByType = createAsyncThunk(
  'heartbeatWidgets/fetchHeartbeatsByType', 
  async () => {
    const response = await axios.get('/heartbeats/widgets/by-type');
    return response.data;
  }
);

export const fetchTopAIUsers = createAsyncThunk(
  'heartbeatWidgets/fetchTopAIUsers', 
  async () => {
    const response = await axios.get('/heartbeats/widgets/top-ai-users');
    return response.data;
  }
);

export const fetchTopBlockedUsers = createAsyncThunk(
  'heartbeatWidgets/fetchTopBlockedUsers', 
  async () => {
    const response = await axios.get('/heartbeats/widgets/top-blocked-ai-users');
    return response.data;
  }
);

export const fetchTopPlatforms = createAsyncThunk(
  'heartbeatWidgets/fetchTopPlatforms', 
  async () => {
    const response = await axios.get('/heartbeats/widgets/top-ai-platforms');
    return response.data;
  }
);

export const fetchDepartmentStats = createAsyncThunk(
  'heartbeatWidgets/fetchDepartmentStats', 
  async () => {
    const response = await axios.get('/heartbeats/widgets/by-department');
    return response.data;
  }
);

const initialState: HeartbeatWidgetsState = {
  heartbeatsByType: [],
  topAIUsers: [],
  topBlockedUsers: [],
  topPlatforms: [],
  departmentStats: [],
  loading: {
    byType: false,
    topUsers: false,
    topBlocked: false,
    platforms: false,
    departments: false,
  },
  errors: {
    byType: null,
    topUsers: null,
    topBlocked: null,
    platforms: null,
    departments: null,
  },
};

const heartbeatWidgets = createSlice({
  name: 'heartbeatWidgets',
  initialState,
  reducers: {
    clearError(state, action: { payload?: { widget?: keyof HeartbeatWidgetsState['errors'] } }) {
      const { widget } = action.payload || {};
      if (widget && widget in state.errors) {
        state.errors[widget] = null;
      } else {
        // Clear all errors
        state.errors.byType = null;
        state.errors.topUsers = null;
        state.errors.topBlocked = null;
        state.errors.platforms = null;
        state.errors.departments = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Heartbeats by type
      .addCase(fetchHeartbeatsByType.pending, (state) => {
        state.loading.byType = true;
        state.errors.byType = null;
      })
      .addCase(fetchHeartbeatsByType.fulfilled, (state, action) => {
        state.loading.byType = false;
        state.heartbeatsByType = action.payload?.data || [];
        state.errors.byType = null;
      })
      .addCase(fetchHeartbeatsByType.rejected, (state, action) => {
        state.loading.byType = false;
        state.errors.byType = action.error.message || 'Failed to fetch heartbeats by type';
      })
      // Top AI Users
      .addCase(fetchTopAIUsers.pending, (state) => {
        state.loading.topUsers = true;
        state.errors.topUsers = null;
      })
      .addCase(fetchTopAIUsers.fulfilled, (state, action) => {
        state.loading.topUsers = false;
        state.topAIUsers = action.payload?.data || [];
        state.errors.topUsers = null;
      })
      .addCase(fetchTopAIUsers.rejected, (state, action) => {
        state.loading.topUsers = false;
        state.errors.topUsers = action.error.message || 'Failed to fetch top AI users';
      })
      // Top Blocked Users
      .addCase(fetchTopBlockedUsers.pending, (state) => {
        state.loading.topBlocked = true;
        state.errors.topBlocked = null;
      })
      .addCase(fetchTopBlockedUsers.fulfilled, (state, action) => {
        state.loading.topBlocked = false;
        state.topBlockedUsers = action.payload?.data || [];
        state.errors.topBlocked = null;
      })
      .addCase(fetchTopBlockedUsers.rejected, (state, action) => {
        state.loading.topBlocked = false;
        state.errors.topBlocked = action.error.message || 'Failed to fetch top blocked users';
      })
      // Top Platforms
      .addCase(fetchTopPlatforms.pending, (state) => {
        state.loading.platforms = true;
        state.errors.platforms = null;
      })
      .addCase(fetchTopPlatforms.fulfilled, (state, action) => {
        state.loading.platforms = false;
        state.topPlatforms = action.payload?.data || [];
        state.errors.platforms = null;
      })
      .addCase(fetchTopPlatforms.rejected, (state, action) => {
        state.loading.platforms = false;
        state.errors.platforms = action.error.message || 'Failed to fetch top platforms';
      })
      // Department Stats
      .addCase(fetchDepartmentStats.pending, (state) => {
        state.loading.departments = true;
        state.errors.departments = null;
      })
      .addCase(fetchDepartmentStats.fulfilled, (state, action) => {
        state.loading.departments = false;
        state.departmentStats = action.payload?.data || [];
        state.errors.departments = null;
      })
      .addCase(fetchDepartmentStats.rejected, (state, action) => {
        state.loading.departments = false;
        state.errors.departments = action.error.message || 'Failed to fetch department stats';
      });
  },
});

export default heartbeatWidgets.reducer;

export const { clearError } = heartbeatWidgets.actions;