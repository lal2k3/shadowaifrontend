import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { isEmpty, isObjectEmpty } from 'components/general/Utils';
import { Agent, AgentKeyToEdit } from 'pages/agents/AgentUtils';
import { Policy } from 'pages/policies/PolicyUtils';

type AgentsState = {
  agents: Agent[];
  loading: boolean;
  reload: boolean;
  error: string | null;
  sidemenu: {
    open: boolean;
  };
  currentAgent: Agent;
  wizard: {
    totalSteps: number;
    step: number;
    navigation: {
      back: {
        visible: boolean;
        enabled: boolean;
      };
      next: {
        visible: boolean;
        enabled: boolean;
      };
    };
  };
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
  policy: null,
};

export const fetchAgents = createAsyncThunk('agents/fetchAgents', async () => {
  const response = await axios.get('/agents');
  return response.data;
});

export const createAgent = createAsyncThunk(
  'agents/createAgent',
  async (agentData: {
    description: string;
    configuration: string | object | null;
    policyId?: string | null;
  }) => {
    const payload = {
      description: agentData.description,
      configuration: agentData.configuration === null 
        ? null 
        : typeof agentData.configuration === 'string'
          ? JSON.parse(agentData.configuration)
          : agentData.configuration,
      policyId: agentData.policyId || null,
    };
    const response = await axios.post('/agents', payload);
    return response.data;
  },
);

export const updateAgent = createAsyncThunk(
  'agents/updateAgent',
  async ({
    id,
    agentData,
  }: {
    id: string;
    agentData: { 
      description: string; 
      configuration: string | object | null;
      policyId?: string | null;
    };
  }) => {
    const payload = {
      description: agentData.description,
      configuration: agentData.configuration === null 
        ? null 
        : typeof agentData.configuration === 'string'
          ? JSON.parse(agentData.configuration)
          : agentData.configuration,
      policyId: agentData.policyId || null,
    };
    const response = await axios.put(`/agents/${id}`, payload);
    return response.data;
  },
);

export const deleteAgent = createAsyncThunk(
  'agents/deleteAgent',
  async (id: string) => {
    await axios.delete(`/agents/${id}`);
    return id;
  },
);

const validateAgent = (agent: Agent) => {
  let isValidate = true;

  if (isEmpty(agent.description)) {
    isValidate = false;
  }

  // Validate agent.configuration is valid JSON and not empty, but allow null
  if (agent.configuration !== null) {
    try {
      let configurationJson;
      
      if (typeof agent.configuration === 'string') {
        configurationJson = JSON.parse(agent.configuration);
      } else {
        configurationJson = agent.configuration;
      }
      
      if (isObjectEmpty(configurationJson)) {
        isValidate = false;
      }
    } catch (error) {
      // Invalid JSON
      isValidate = false;
    }
  }

  return isValidate;
};

const initialState: AgentsState = {
  agents: [],
  loading: false,
  reload: true,
  error: null,
  sidemenu: {
    open: false,
  },
  currentAgent: EMPTY_AGENT,
  wizard: {
    totalSteps: 1,
    step: 0,
    navigation: {
      back: {
        visible: false,
        enabled: false,
      },
      next: {
        visible: true,
        enabled: false,
      },
    },
  },
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
    setAgentWizardStep(state, action) {
      state.wizard.step = action.payload;
    },
    agentWizardNextStep(state) {
      state.wizard.step++;
    },
    agentWizardPrevStep(state) {
      state.wizard.step--;
    },
    agentSetWizardNextNavigation(state, action) {
      state.wizard.navigation.next = action.payload;
    },
    agentSetWizardBackNavigation(state, action) {
      state.wizard.navigation.back = action.payload;
    },
    agentUpdateValue(state, action) {
      const field: AgentKeyToEdit = action.payload.field;

      switch (field) {
        case 'description':
          state.currentAgent[field] = action.payload.value;
          break;
        case 'configuration':
          state.currentAgent[field] = action.payload.value;
          break;
        case 'policy':
          state.currentAgent[field] = action.payload.value as Policy;
          break;
      }

      if (validateAgent(state.currentAgent)) {
        state.wizard.navigation.next.enabled = true;
      } else {
        state.wizard.navigation.next.enabled = false;
      }
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
        state.reload = false;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agents';
      })
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgent.fulfilled, (state) => {
        state.loading = false;
        state.reload = true;
        state.sidemenu.open = false;
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create agent';
      })
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state) => {
        state.loading = false;
        state.reload = true;
        state.sidemenu.open = false;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update agent';
      })
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgent.fulfilled, (state) => {
        state.loading = false;
        state.reload = true;
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete agent';
      });
  },
});

export default agents.reducer;

export const {
  setAgentsSideMenuOpen,
  setCurrentAgent,
  setAgentWizardStep,
  agentWizardNextStep,
  agentWizardPrevStep,
  agentSetWizardNextNavigation,
  agentSetWizardBackNavigation,
  agentUpdateValue,
} = agents.actions;
