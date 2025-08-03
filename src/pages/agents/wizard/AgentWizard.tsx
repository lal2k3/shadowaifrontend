import { Box } from '@mui/material';
import AgentWizardNavigation from './AgentWizardNavigation';
import AgentWizardStepOne from './AgentWizardStepOne';

const AgentWizard = () => {
  return (
    <Box className="integrationwizardcontainer">
      <Box className="wizardsteps">
        <Box className="header">
          <Box className="wizardtitle">Agent Configuration</Box>
        </Box>
        <Box className="wizardintegrationscontainer">
          <AgentWizardStepOne />
        </Box>
        <Box className="footer">
          <AgentWizardNavigation />
        </Box>
      </Box>
    </Box>
  );
};

export default AgentWizard;