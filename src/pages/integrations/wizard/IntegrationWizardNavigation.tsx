import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import { wizardNextStep, wizardPrevStep } from 'store/reducers/integrations';

const IntegrationWizardNavigation = () => {
  const dispatch = useDispatch();
  const step = useSelector(
    (state: IRootState) => state.integrations.wizard.step,
  );
  const config = useSelector(
    (state: IRootState) => state.integrations.wizard.config,
  );

  const renderPrev = () => {
    const visibility = step === 1 ? 'hidden' : undefined;

    return (
      <Box sx={{ visibility }}>
        <Button variant="contained" onClick={() => dispatch(wizardPrevStep())}>
          Back
        </Button>
      </Box>
    );
  };

  const renderNext = () => {
    let disabled = true;
    const stepConfig = config.find((conf) => conf.step === step);

    if (step === 1) {
      const selectedValue = stepConfig?.data.find(
        (data) => data.field === 'type',
      );

      if (selectedValue?.value !== 'NONE') {
        disabled = false;
      }
    }

    return (
      <Box>
        <Button
          disabled={disabled}
          onClick={() => dispatch(wizardNextStep())}
          variant="contained"
        >
          Next
        </Button>
      </Box>
    );
  };

  return (
    <Box className="wizardnavigation">
      {renderPrev()}
      {renderNext()}
    </Box>
  );
};

export default IntegrationWizardNavigation;
