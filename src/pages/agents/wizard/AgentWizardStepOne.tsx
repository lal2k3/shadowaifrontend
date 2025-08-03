import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { AgentKeyToEdit } from '../AgentUtils';
import { agentUpdateValue } from 'store/reducers/agents';

const AgentWizardStepOne = () => {
  const currentAgent = useSelector(
    (state: IRootState) => state.agents.currentAgent,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateFieldValue = (
    field: AgentKeyToEdit,
    value: string | boolean,
  ) => {
    dispatch(agentUpdateValue({ field, value }));
  };

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