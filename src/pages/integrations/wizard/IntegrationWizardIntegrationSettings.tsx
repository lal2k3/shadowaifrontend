import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import { IntegrationForms, IntegrationType } from '../IntegrationsUtls';

const IntegrationWizardIntegrationSettings = () => {
  const config = useSelector(
    (state: IRootState) => state.integrations.wizard.config,
  );

  const getSelectedIntegration = (): IntegrationType => {
    const stepConfig = config.find((conf) => conf.step === 1);
    const selectedValue = stepConfig?.data.find(
      (data) => data.field === 'type',
    );

    return selectedValue.value as IntegrationType;
  };

  return <Box>{IntegrationForms[getSelectedIntegration()]}</Box>;
};

export default IntegrationWizardIntegrationSettings;
