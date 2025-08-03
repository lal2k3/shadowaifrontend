import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import AgentWizard from './wizard/AgentWizard';
import { setAgentsSideMenuOpen } from 'store/reducers/agents';

const AgentDrawer = () => {
  const isOpen = useSelector(
    (state: IRootState) => state.agents.sidemenu.open,
  );
  const dispatch = useDispatch();

  return (
    <Drawer
      open={isOpen}
      onClose={() => dispatch(setAgentsSideMenuOpen(false))}
      anchor="right"
      PaperProps={{
        className: 'integrationsdrawer',
      }}
    >
      <AgentWizard />
    </Drawer>
  );
};

export default AgentDrawer;