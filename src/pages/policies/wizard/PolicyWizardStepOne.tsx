import { Box } from '@mui/material';
/*import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { PolicyKey } from '../PolicyUtils';
import { policyUpdateValue } from 'store/reducers/policies';*/

const PolicyWizardStepOne = () => {
  /*const currentPolicy = useSelector(
    (state: IRootState) => state.policies.currentPolicy,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateFieldValue = (field: PolicyKey, value: string) => {
    dispatch(policyUpdateValue({ field, value }));
  };*/

  return (
    <Box className="policywizardstepone">
      <Box className="policywizardform">
      </Box>
    </Box>
  );
};

export default PolicyWizardStepOne;
