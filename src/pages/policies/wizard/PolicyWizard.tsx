import { Box } from '@mui/material';
import IntegrationWizardNavigation from 'pages/integrations/wizard/IntegrationWizardNavigation';

const PolicyWizard = () => {
  return (
    <Box className="integrationwizardcontainer">
      <Box className="wizardsteps">
        <Box className="header">
          <Box className="wizardtitle">Policy Configuration</Box>
        </Box>
        <Box className="wizardintegrationscontainer"></Box>{' '}
        <Box className="footer">
          <IntegrationWizardNavigation />
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyWizard;
//{steps[step]}
