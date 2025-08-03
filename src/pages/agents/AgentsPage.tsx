import { Box } from '@mui/material';
import AgentsPanel from './AgentsPanel';
import AgentDrawer from './AgentDrawer';

const AgentsPage = () => {
  return (
    <Box className="defaultPage">
      <AgentDrawer />
      <AgentsPanel />
    </Box>
  );
};

export default AgentsPage;