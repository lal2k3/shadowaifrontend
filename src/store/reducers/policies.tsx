/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const DEFAULT_POLICY_TEMPLATE = {
  "files": [
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".py", ".ipynb", ".java", ".class", ".jar",
    ".c", ".cpp", ".h", ".hpp", ".cs", ".go", ".rb", ".php", ".rs", ".kt", ".kts",
    ".swift", ".sh", ".bash", ".zsh", ".html", ".css", ".scss", ".less", ".sql",
    ".dump", ".env", ".ini", ".conf", ".toml", ".json", ".yaml", ".yml", ".zip",
    ".tar", ".gz", ".rar", ".7z", "Dockerfile"
  ],
  "rules": {
    "filesFilter": true,
    "imageFilter": true,
    "iframeFilter": true,
    "enableEntropy": true,
    "enableKeywords": true,
    "enablePatterns": true,
    "enableSourceCode": true,
    "enableRegexChecks": true,
    "enableSensitiveKeyPatterns": true
  },
  "keywords": [
    "password", "pass", "secret", "api_key", "apikey", "access_token", "auth_token",
    "jwt", "client_secret", "private_key", "ssh-rsa", "confidential", "internal use only",
    "do not share", "nda", "credentials", "login", "database", ".env", "config file",
    "encryption_key", "token", "key="
  ],
  "logLevel": "info",
  "patterns": [
    "\\b(?:\\d[ -]*?){13,16}\\b",
    "\\b(?:[A-Fa-f0-9]{32,})\\b",
    "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b",
    "-----BEGIN (RSA|PRIVATE|API|OPENSSH) KEY-----",
    "([\"']?(password|secret|token|key|auth)[\"']?\\s*[:=]\\s*[\"']?.{4,100}?[\"']?)",
    "\\b(confidential|internal use|do not distribute|strictly confidential)\\b",
    "(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\\s.+",
    "(function|class|import|require|public static)"
  ],
  "severity": "low",
  "minCodeLines": 12
};

export const EMPTY_POLICY: Policy = {
  id: '',
  name: '',
  policy: { policy: DEFAULT_POLICY_TEMPLATE },
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
    // Build the final policy with the default template and user rules
    let finalPolicy;
    
    if (typeof policyData.policy === 'string') {
      try {
        const parsed = JSON.parse(policyData.policy);
        finalPolicy = parsed;
      } catch {
        finalPolicy = { policy: DEFAULT_POLICY_TEMPLATE };
      }
    } else {
      finalPolicy = policyData.policy;
    }
    
    // If it's our structured format, construct the complete policy
    const policyObj = finalPolicy as any;
    if (policyObj.policy && policyObj.policy.rules) {
      const completePolicy = {
        ...DEFAULT_POLICY_TEMPLATE,
        rules: policyObj.policy.rules
      };
      finalPolicy = { policy: completePolicy };
    }
    
    const payload = {
      name: policyData.name,
      policy: finalPolicy,
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
    // Build the final policy with the default template and user rules
    let finalPolicy;
    
    if (typeof policyData.policy === 'string') {
      try {
        const parsed = JSON.parse(policyData.policy);
        finalPolicy = parsed;
      } catch {
        finalPolicy = { policy: DEFAULT_POLICY_TEMPLATE };
      }
    } else {
      finalPolicy = policyData.policy;
    }
    
    // If it's our structured format, construct the complete policy
    const policyObj = finalPolicy as any;
    if (policyObj.policy && policyObj.policy.rules) {
      const completePolicy = {
        ...DEFAULT_POLICY_TEMPLATE,
        rules: policyObj.policy.rules
      };
      finalPolicy = { policy: completePolicy };
    }
    
    const payload = {
      name: policyData.name,
      policy: finalPolicy,
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

  // Validate policy.policy is valid and not empty
  try {
    let policyJson;
    
    if (typeof policy.policy === 'string') {
      policyJson = JSON.parse(policy.policy);
    } else {
      policyJson = policy.policy;
    }
    
    // More flexible validation - accept both old and new structures
    if (isObjectEmpty(policyJson)) {
      isValidate = false;
    } else {
      // Check if it's our new structure or legacy structure
      const policyObj = policyJson as any;
      if (policyObj.policy) {
        // New structure - should have rules
        if (!policyObj.policy.rules || isObjectEmpty(policyObj.policy.rules)) {
          isValidate = false;
        }
      }
      // For legacy structures, just check if not empty (already done above)
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
      const policy = action.payload;
      
      // When setting an existing policy for editing, ensure it has the right structure
      if (policy && policy.policy && typeof policy.policy === 'object') {
        const policyObj = policy.policy as any;
        // If the policy doesn't have our expected structure, wrap it
        if (!policyObj.policy) {
          // This is likely a legacy policy structure, wrap it properly
          const wrappedPolicy = {
            ...policy,
            policy: {
              policy: policy.policy
            }
          };
          state.currentPolicy = wrappedPolicy;
        } else {
          state.currentPolicy = policy;
        }
      } else {
        state.currentPolicy = policy;
      }
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
    policyUpdateRule(state, action) {
      const { ruleKey, value } = action.payload;
      
      // Ensure policy structure exists
      if (typeof state.currentPolicy.policy === 'string') {
        try {
          state.currentPolicy.policy = JSON.parse(state.currentPolicy.policy);
        } catch {
          state.currentPolicy.policy = { policy: DEFAULT_POLICY_TEMPLATE };
        }
      }
      
      // Type assertion to work with the policy structure
      const policyObj = state.currentPolicy.policy as any;
      
      if (!policyObj.policy) {
        policyObj.policy = DEFAULT_POLICY_TEMPLATE;
      }
      
      if (!policyObj.policy.rules) {
        policyObj.policy.rules = DEFAULT_POLICY_TEMPLATE.rules;
      }
      
      // Update the specific rule
      policyObj.policy.rules[ruleKey] = value;

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
  policyUpdateRule,
} = general.actions;
