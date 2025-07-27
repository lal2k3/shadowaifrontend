import { createSlice } from '@reduxjs/toolkit';
import { Policy, PolicyKey } from 'pages/policies/PolicyUtils';

type PoliciesState = {
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
  trigger: '',
  time: '',
  recurrence: '',
  appliesTo: '',
  rules: [],
};

const initialState: PoliciesState = {
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
      const field: PolicyKey = action.payload.field;
      state.currentPolicy[field] = action.payload.value;
    },
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
