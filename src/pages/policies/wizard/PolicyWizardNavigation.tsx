import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import {
  policyWizardNextStep,
  policyWizardPrevStep,
} from 'store/reducers/policies';

const PolicyWizardNavigation = () => {
  const dispatch = useDispatch();
  const { navigation } = useSelector(
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

  const renderNext = () => {
    const visibility = navigation.next.visible ? 'visible' : 'hidden';
    const enabled = navigation.next.enabled;

    return (
      <Box sx={{ visibility }}>
        <Button
          disabled={!enabled}
          variant="contained"
          onClick={() => dispatch(policyWizardNextStep())}
        >
          Finish
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
