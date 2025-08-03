import { Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Agent } from './AgentUtils';
import { RiRobotLine, RiDeleteBin6Line, RiKeyLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
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
  const [showKeyDialog, setShowKeyDialog] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this agent?`)) {
      dispatch(deleteAgent(data.id));
    }
  };

  const handleShowKey = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowKeyDialog(true);
  };

  const handleCloseKeyDialog = () => {
    setShowKeyDialog(false);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(data.token);
  };

  return (
    <>
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
          onClick={handleShowKey}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'primary.dark',
            },
          }}
          size="small"
        >
          <RiKeyLine />
        </IconButton>

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

      <Dialog open={showKeyDialog} onClose={handleCloseKeyDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Agent Token</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Agent Token"
            value={data.token}
            variant="outlined"
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'monospace',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyKey} variant="outlined">
            Copy Token
          </Button>
          <Button onClick={handleCloseKeyDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AgentItem;