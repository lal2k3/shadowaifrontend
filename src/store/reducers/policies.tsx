import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { isEmpty, isObjectEmpty } from 'components/general/Utils';
import { Policy, PolicyKeyToEdit } from 'pages/policies/PolicyUtils';

type PoliciesState = {
  policies: Policy[];
  loading: boolean;
  reload: boolean;
  error: string | null;
  sidemenu: {
    open: boolean;
  };
  currentPolicy: Policy;
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

export const createPolicy = createAsyncThunk(
  'policies/createPolicy',
  async (policyData: { name: string; policy: string | object }) => {
    const payload = {
      name: policyData.name,
      policy:
        typeof policyData.policy === 'string'
          ? JSON.parse(policyData.policy)
          : policyData.policy,
    };
    const response = await axios.post('/policies', payload);
    return response.data;
  },
);

export const updatePolicy = createAsyncThunk(
  'policies/updatePolicy',
  async ({
    id,
    policyData,
  }: {
    id: string;
    policyData: { name: string; policy: string | object };
  }) => {
    const payload = {
      name: policyData.name,
      policy:
        typeof policyData.policy === 'string'
          ? JSON.parse(policyData.policy)
          : policyData.policy,
    };
    const response = await axios.put(`/policies/${id}`, payload);
    return response.data;
  },
);

export const deletePolicy = createAsyncThunk(
  'policies/deletePolicy',
  async (id: string) => {
    await axios.delete(`/policies/${id}`);
    return id;
  },
);

const validatePolicy = (policy: Policy) => {
  let isValidate = true;

  if (isEmpty(policy.name)) {
    isValidate = false;
  }

  // Validate policy.policy is valid JSON and not empty
  try {
    let policyJson;
    
    if (typeof policy.policy === 'string') {
      policyJson = JSON.parse(policy.policy);
    } else {
      policyJson = policy.policy;
    }
    
    if (isObjectEmpty(policyJson)) {
      isValidate = false;
    }
  } catch (error) {
    // Invalid JSON
    isValidate = false;
  }

  return isValidate;
};

const initialState: PoliciesState = {
  policies: [],
  loading: false,
  reload: true,
  error: null,
  sidemenu: {
    open: false,
  },
  currentPolicy: EMPTY_POLICY,
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
      }

      if (validatePolicy(state.currentPolicy)) {
        state.wizard.navigation.next.enabled = true;
      } else {
        state.wizard.navigation.next.enabled = false;
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
        state.reload = false;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch policies';
      })
      .addCase(createPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPolicy.fulfilled, (state) => {
        state.loading = false;
        state.reload = true;
        state.sidemenu.open = false;
      })
      .addCase(createPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create policy';
      })
      .addCase(updatePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePolicy.fulfilled, (state) => {
        state.loading = false;
        state.reload = true;
        state.sidemenu.open = false;
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update policy';
      })
      .addCase(deletePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePolicy.fulfilled, (state) => {
        state.loading = false;
        state.reload = true;
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete policy';
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
