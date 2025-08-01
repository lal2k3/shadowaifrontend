import { Box, CircularProgress, Alert } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AgentItem from './AgentItem';
import NewAgentItem from './NewAgentItem';
import { fetchAgents } from 'store/reducers/agents';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

const AgentsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { agents, loading, error } = useSelector((state: IRootState) => state.agents);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch, token]);

  const renderAgents = () => {
    const agentElements: ReactNode[] = [];

    agents?.forEach((agent) => {
      agentElements.push(
        <AgentItem data={agent} key={`agent-${agent.id}`} />,
      );
    });

    return agentElements;
  };

  if (loading) {
    return (
      <Box className="integrationspanel" display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="integrationspanel">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="integrationspanel">
      <NewAgentItem />
      {renderAgents()}
    </Box>
  );
};

export default AgentsPanel;