import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
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

  const updateFieldValue = (field: PolicyKeyToEdit, value: string | boolean) => {
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
          value={typeof currentPolicy?.policy === 'string' ? currentPolicy.policy : JSON.stringify(currentPolicy?.policy || {}, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              updateFieldValue('policy', parsed);
            } catch {
              updateFieldValue('policy', e.target.value);
            }
          }}
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          placeholder="Enter policy JSON configuration"
          sx={{ '& .MuiInputBase-root': { fontFamily: 'monospace' } }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={currentPolicy?.isActive || false}
              onChange={(e) => updateFieldValue('isActive', e.target.checked)}
            />
          }
          label="Active Policy"
        />
      </Box>
    </Box>
  );
};

export default PolicyWizardStepOne;
