import { Box, Button } from '@mui/material';
import { isEmpty } from 'components/general/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import {
  createPolicy,
  policyWizardNextStep,
  policyWizardPrevStep,
  updatePolicy,
} from 'store/reducers/policies';

const PolicyWizardNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPolicy = useSelector(
    (state: IRootState) => state.policies.currentPolicy,
  );
  const { navigation, step, totalSteps } = useSelector(
    (state: IRootState) => state.policies.wizard,
  );

  const renderBack = () => {
    const visibility = navigation.back.visible ? 'visible' : 'hidden';
    const enabled = navigation.back.enabled;

    return (
      <Box sx={{ visibility }}>
        <Button
          disabled={!enabled}
          variant="contained"
          onClick={() => dispatch(policyWizardPrevStep())}
        >
          Back
        </Button>
      </Box>
    );
  };

  const getNextText = () => {
    if (step === totalSteps) {
      if (isEmpty(currentPolicy.id)) {
        return 'Finish';
      } else {
        return 'Update';
      }
    } else {
      return 'Next';
    }
  };

  const nextAction = () => {
    if (step === totalSteps) {
      const policyData = {
        name: currentPolicy.name,
        policy: currentPolicy.policy,
      };

      if (isEmpty(currentPolicy.id)) {
        dispatch(createPolicy(policyData));
      } else {
        dispatch(updatePolicy({ id: currentPolicy.id, policyData }));
      }
    } else {
      dispatch(policyWizardNextStep());
    }
  };

  const renderNext = () => {
    const visibility = navigation.next.visible ? 'visible' : 'hidden';
    const enabled = navigation.next.enabled;

    return (
      <Box sx={{ visibility }}>
        <Button
          disabled={!enabled}
          variant="contained"
          onClick={() => nextAction()}
        >
          {getNextText()}
        </Button>
      </Box>
    );
  };

  return (
    <Box className="wizardnavigation">
      {renderBack()}
      {renderNext()}
    </Box>
  );
};

export default PolicyWizardNavigation;
