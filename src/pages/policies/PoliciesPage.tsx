import { Box } from '@mui/material';
import PoliciesPanel from './PoliciesPanel';
import PolicyDrawer from './PolicyDrawer';

const PoliciesPage = () => {
  return (
    <Box className="defaultPage">
      <PolicyDrawer />
      <PoliciesPanel />
    </Box>
  );
};

export default PoliciesPage;
