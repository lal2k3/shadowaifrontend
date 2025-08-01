import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Agent/*, AgentKey*/ } from 'pages/agents/AgentUtils';

type AgentsState = {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  sidemenu: {
    open: boolean;
  };
  currentAgent: Agent;
};

export const EMPTY_AGENT: Agent = {
  id: '',
  description: '',
  configuration: null,
  createdAt: '',
  updatedAt: '',
  organization: {
    id: '',
    name: '',
  },
  policy: {
    id: '',
    name: '',
    policy: {
      rules: [],
      description: '',
      permissions: [],
    },
  },
};

export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async () => {
    const response = await axios.get('/agents');
    return response.data;
  },
);

const initialState: AgentsState = {
  agents: [],
  loading: false,
  error: null,
  sidemenu: {
    open: false,
  },
  currentAgent: EMPTY_AGENT,
};

const agents = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgentsSideMenuOpen(state, action) {
      state.sidemenu.open = action.payload;
    },
    setCurrentAgent(state, action) {
      state.currentAgent = action.payload;
    },
    agentUpdateValue(/*state, action*/) {
      //const field: AgentKey = action.payload.field;
      // Handle nested updates if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload?.agents;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agents';
      });
  },
});

export default agents.reducer;

export const {
  setAgentsSideMenuOpen,
  setCurrentAgent,
  agentUpdateValue,
} = agents.actions;