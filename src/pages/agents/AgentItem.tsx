import { Box } from '@mui/material';
import { Agent } from './AgentUtils';
import { RiRobotLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import {
  setCurrentAgent,
  setAgentsSideMenuOpen,
} from 'store/reducers/agents';

interface Prop {
  data: Agent;
}

const AgentItem = ({ data }: Prop) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box
      className="integrationitem"
      onClick={() => {
        dispatch(setCurrentAgent(data));
        dispatch(setAgentsSideMenuOpen(true));
      }}
    >
      <Box className="integrationitemlogo">{<RiRobotLine />}</Box>
      <Box>{data.description || `Agent ${data.id.slice(0, 8)}`}</Box>
    </Box>
  );
};

export default AgentItem;