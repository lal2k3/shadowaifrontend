import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { PolicyKeyToEdit } from '../PolicyUtils';
import { policyUpdateValue } from 'store/reducers/policies';

const PolicyWizardStepOne = () => {
  const currentPolicy = useSelector(
    (state: IRootState) => state.policies.currentPolicy,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateFieldValue = (
    field: PolicyKeyToEdit,
    value: string | boolean,
  ) => {
    dispatch(policyUpdateValue({ field, value }));
  };

  return (
    <Box className="policywizardstepone">
      <Box className="policywizardform">
        <TextField
          label="Policy Name"
          value={currentPolicy?.name || ''}
          onChange={(e) => updateFieldValue('name', e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Enter policy name"
        />

        <TextField
          label="Policy JSON"
          value={
            typeof currentPolicy?.policy === 'string'
              ? currentPolicy.policy
              : JSON.stringify(currentPolicy?.policy || {}, null, 2)
          }
          onChange={(e) => {
            updateFieldValue('policy', e.target.value);
          }}
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          placeholder="Enter policy JSON configuration"
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

export default PolicyWizardStepOne;
