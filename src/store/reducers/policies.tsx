import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Policy, PolicyKeyToEdit } from 'pages/policies/PolicyUtils';

type PoliciesState = {
  policies: Policy[];
  loading: boolean;
  error: string | null;
  sidemenu: {
    open: boolean;
  };
  currentPolicy: Policy;
  wizard: {
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

export const EMPTY_POLICY: Policy = {
  id: '',
  name: '',
  policy: {},
  ownerId: '',
  organizationId: '',
  isActive: false,
  createdAt: '',
  updatedAt: '',
  owner: {
    id: '',
    username: '',
    email: '',
  },
};

export const fetchPolicies = createAsyncThunk(
  'policies/fetchPolicies',
  async () => {
    const response = await axios.get('/policies');
    return response.data;
  },
);

const initialState: PoliciesState = {
  policies: [],
  loading: false,
  error: null,
  sidemenu: {
    open: false,
  },
  currentPolicy: EMPTY_POLICY,
  wizard: {
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

const general = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    setPoliciesSideMenuOpen(state, action) {
      state.sidemenu.open = action.payload;
    },
    setCurrentPolicy(state, action) {
      state.currentPolicy = action.payload;
    },
    setPolicyWizardStep(state, action) {
      state.wizard.step = action.payload;
    },
    policyWizardNextStep(state) {
      state.wizard.step++;
    },
    policyWizardPrevStep(state) {
      state.wizard.step--;
    },
    policySetWizardNextNavigation(state, action) {
      state.wizard.navigation.next = action.payload;
    },
    policySetWizardBackNavigation(state, action) {
      state.wizard.navigation.back = action.payload;
    },
    policyUpdateValue(state, action) {
      const field: PolicyKeyToEdit = action.payload.field;

      switch (field) {
        case 'name':
          state.currentPolicy[field] = action.payload.value;
          break;
        case 'policy':
          state.currentPolicy[field] = action.payload.value;
          break;
        case 'isActive':
          state.currentPolicy[field] = action.payload.value;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = action.payload?.policies;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch policies';
      });
  },
});

export default general.reducer;

export const {
  setPoliciesSideMenuOpen,
  setCurrentPolicy,
  setPolicyWizardStep,
  policyWizardNextStep,
  policyWizardPrevStep,
  policySetWizardNextNavigation,
  policySetWizardBackNavigation,
  policyUpdateValue,
} = general.actions;
