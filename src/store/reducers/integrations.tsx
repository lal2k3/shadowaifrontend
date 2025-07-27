import { createSlice } from '@reduxjs/toolkit';
import { Integration } from 'pages/integrations/IntegrationsUtls';

type IntegrationsState = {
  drawer: {
    isOpen: boolean;
    integration: Integration;
  };
  wizard: {
    step: number;
    config: {
      step: number;
      data: {
        field: string;
        value: unknown;
      }[];
    }[];
  };
};

const initialState: IntegrationsState = {
  drawer: {
    isOpen: false,
    integration: null,
  },
  wizard: {
    step: 0,
    config: [],
  },
};

const integrations = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    setDrawer(state, action) {
      state.drawer = action.payload;
    },
    setWizardStep(state, action) {
      state.wizard.step = action.payload;
    },
    initStepConfig(state, action) {
      const step: number = action.payload.step;

      const currentConfig = state.wizard.config.find(
        (config) => config.step === step,
      );

      if (currentConfig === undefined) {
        state.wizard.config.push({
          step,
          data: action.payload.data,
        });
      } else {
        currentConfig.data = action.payload.data;
      }
    },
    updateFieldValue(state, action) {
      state.wizard.config
        .find((field) => field.step === action.payload.step)
        .data.find((data) => data.field === action.payload.field).value =
        action.payload.value;
    },
    wizardNextStep(state) {
      state.wizard.step++;
    },
    wizardPrevStep(state) {
      state.wizard.step--;
    },
  },
});

export default integrations.reducer;

export const {
  setDrawer,
  setWizardStep,
  initStepConfig,
  updateFieldValue,
  wizardNextStep,
  wizardPrevStep,
} = integrations.actions;
