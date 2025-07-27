import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import IntegrationWizardStepOne from './IntegrationWizardStepOne';
import { ReactNode } from 'react';
import IntegrationWizardNavigation from './IntegrationWizardNavigation';
import { IntegrationWizardTitles } from '../IntegrationsUtls';
import IntegrationWizardIntegrationSettings from './IntegrationWizardIntegrationSettings';

type Steps = {
  [key: number]: ReactNode;
};

const steps: Steps = {
  1: <IntegrationWizardStepOne />,
  2: <IntegrationWizardIntegrationSettings />
};

const IntegrationWizard = () => {
  const { step } = useSelector(
    (state: IRootState) => state.integrations.wizard,
  );

  return (
    <Box className="integrationwizardcontainer">
      <Box className="wizardsteps">
        <Box className="header">
          <Box className="wizardtitle">{IntegrationWizardTitles[step]}</Box>
        </Box>
        <Box className="wizardintegrationscontainer">{steps[step]}</Box>{' '}
        <Box className="footer">
          <IntegrationWizardNavigation />
        </Box>
      </Box>
    </Box>
  );
};

export default IntegrationWizard;
