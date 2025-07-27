import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { PolicyKey } from '../PolicyUtils';
import { policyUpdateValue } from 'store/reducers/policies';
import MultiSelect from 'components/form/MultiSelect';

export const APPLIES_TO_VALUES = ['Repository', 'Workload'];
export const GIVEN_VALUES = [
  'CVE found',
  'New Reachability found',
  'New patch available',
];
export const CONDITION_VALUES = ['Risk Score', 'Confidence Score', 'EPSS'];
export const ACTION_VALUES = [
  'Create a PR',
  'Run Confidence Tests',
  'Open Ticket',
  'Send to Slack Channel',
];

const PolicyWizardStepOne = () => {
  const currentPolicy = useSelector(
    (state: IRootState) => state.policies.currentPolicy,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateFieldValue = (field: PolicyKey, value: string) => {
    dispatch(policyUpdateValue({ field, value }));
  };

  return (
    <Box className="policywizardstepone">
      <Box className="policywizardform">
        <Box>Name</Box>
        <TextField
          label="Policy Name"
          variant="outlined"
          value={currentPolicy.name}
          onChange={(e) => updateFieldValue('name', e.target.value)}
        />
        <Box>Given</Box>
        <MultiSelect options={GIVEN_VALUES} label="Category" />
        <Box>On</Box>
        <MultiSelect options={CONDITION_VALUES} label="Add Condition" />
        <Box>Do</Box>
        <MultiSelect options={ACTION_VALUES} label="Actions" />
        <Box>Applies To</Box>
        <MultiSelect options={APPLIES_TO_VALUES} label="Applies to" />
        <Box>When</Box>
        <TextField
          label="Recurrence"
          variant="outlined"
          value={currentPolicy.recurrence}
          onChange={(e) => updateFieldValue('recurrence', e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default PolicyWizardStepOne;
