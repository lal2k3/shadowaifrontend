import { Box } from '@mui/material';
import PolicyWizardNavigation from './PolicyWizardNavigation';
import PolicyWizardStepOne from './PolicyWizardStepOne';

const PolicyWizard = () => {
  return (
    <Box className="integrationwizardcontainer">
      <Box className="wizardsteps">
        <Box className="header">
          <Box className="wizardtitle">Policy Configuration</Box>
        </Box>
        <Box className="wizardintegrationscontainer">
          <PolicyWizardStepOne />
        </Box>
        <Box className="footer">
          <PolicyWizardNavigation />
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyWizard;
//{steps[step]}
