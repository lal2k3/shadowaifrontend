import { Box } from '@mui/material';
import Policies from 'components/Policies/Policies';

const PolicyWizard = () => {
  return (
    <Box className="integrationwizardcontainer">
      <Box className="wizardsteps">
        <Box className="header">
          <Box className="wizardtitle">Policy Configuration</Box>
        </Box>
       <Policies/>
        {/* <Box className="wizardintegrationscontainer">{steps[step]}</Box>{' '} */}
        <Box className="footer">
          {/* <IntegrationWizardNavigation /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyWizard;
