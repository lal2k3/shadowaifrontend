import { Box, IconButton } from '@mui/material';
import { Agent } from './AgentUtils';
import { RiRobotLine, RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import {
  setCurrentAgent,
  setAgentsSideMenuOpen,
  setAgentWizardStep,
  agentSetWizardNextNavigation,
  agentSetWizardBackNavigation,
  deleteAgent,
} from 'store/reducers/agents';

interface Prop {
  data: Agent;
}

const AgentItem = ({ data }: Prop) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this agent?`)) {
      dispatch(deleteAgent(data.id));
    }
  };

  return (
    <Box
      className="integrationitem"
      onClick={() => {
        dispatch(setAgentWizardStep(1));
        dispatch(
          agentSetWizardNextNavigation({ visible: true, enabled: true }),
        );
        dispatch(
          agentSetWizardBackNavigation({ visible: false, enabled: false }),
        );
        dispatch(setCurrentAgent(data));
        dispatch(setAgentsSideMenuOpen(true));
      }}
      sx={{ position: 'relative' }}
    >
      <Box className="integrationitemlogo">{<RiRobotLine />}</Box>
      <Box>{data.description || `Agent ${data.id.slice(0, 8)}`}</Box>
      <IconButton
        onClick={handleDelete}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'error.main',
          '&:hover': {
            backgroundColor: 'error.light',
            color: 'error.dark',
          },
        }}
        size="small"
      >
        <RiDeleteBin6Line />
      </IconButton>
    </Box>
  );
};

export default AgentItem;