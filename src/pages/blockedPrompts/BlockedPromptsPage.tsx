import { Box } from '@mui/material';
import BlockedPromptsPanel from './BlockedPromptsPanel';

const BlockedPromptsPage = () => {
  return (
    <Box className="defaultPage">
      <BlockedPromptsPanel />
    </Box>
  );
};

export default BlockedPromptsPage;