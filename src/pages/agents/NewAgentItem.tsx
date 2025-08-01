import { Box } from '@mui/material';
import { RiAddLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import {
  setCurrentAgent,
  setAgentsSideMenuOpen,
  EMPTY_AGENT,
} from 'store/reducers/agents';

const NewAgentItem = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box
      className="integrationitem"
      onClick={() => {
        dispatch(setCurrentAgent(EMPTY_AGENT));
        dispatch(setAgentsSideMenuOpen(true));
      }}
    >
      <Box className="integrationitemlogo">{<RiAddLine />}</Box>
      <Box>Add New Agent</Box>
    </Box>
  );
};

export default NewAgentItem;