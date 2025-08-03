import { Box, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { AgentKeyToEdit } from '../AgentUtils';
import { agentUpdateValue } from 'store/reducers/agents';
import { fetchPolicies } from 'store/reducers/policies';

const AgentWizardStepOne = () => {
  const currentAgent = useSelector(
    (state: IRootState) => state.agents.currentAgent,
  );
  const policies = useSelector(
    (state: IRootState) => state.policies.policies,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateFieldValue = (
    field: AgentKeyToEdit,
    value: unknown,
  ) => {
    dispatch(agentUpdateValue({ field, value }));
  };

  useEffect(() => {
    // Fetch policies when component mounts if not already loaded
    if (!policies || policies.length === 0) {
      dispatch(fetchPolicies());
    }
  }, [dispatch, policies]);

  return (
    <Box className="agentwizardstepone">
      <Box className="agentwizardform">
        <TextField
          label="Agent Description"
          value={currentAgent?.description || ''}
          onChange={(e) => updateFieldValue('description', e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Enter agent description"
        />

        <Autocomplete
          options={policies || []}
          getOptionLabel={(option) => option.name}
          value={currentAgent?.policy || null}
          onChange={(_, newValue) => updateFieldValue('policy', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Policy"
              placeholder="Select a policy (optional)"
              variant="outlined"
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />

        <TextField
          label="Agent Configuration"
          value={
            typeof currentAgent?.configuration === 'string'
              ? currentAgent.configuration
              : JSON.stringify(currentAgent?.configuration || {}, null, 2)
          }
          onChange={(e) => {
            updateFieldValue('configuration', e.target.value);
          }}
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          placeholder="Enter agent configuration JSON"
          sx={{ 
            '& .MuiInputBase-root': { 
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap'
            } 
          }}
        />
      </Box>
    </Box>
  );
};

export default AgentWizardStepOne;