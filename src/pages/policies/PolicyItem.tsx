import { Box, IconButton } from '@mui/material';
import { Policy } from './PolicyUtils';
import { RiFileList3Line, RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import {
  policySetWizardBackNavigation,
  policySetWizardNextNavigation,
  setCurrentPolicy,
  setPoliciesSideMenuOpen,
  setPolicyWizardStep,
  deletePolicy,
} from 'store/reducers/policies';

interface Prop {
  data: Policy;
}

const PolicyItem = ({ data }: Prop) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${data.name}"?`)) {
      dispatch(deletePolicy(data.id));
    }
  };

  return (
    <Box
      className="integrationitem"
      onClick={() => {
        dispatch(setPolicyWizardStep(1));
        dispatch(
          policySetWizardNextNavigation({ visible: true, enabled: true }),
        );
        dispatch(
          policySetWizardBackNavigation({ visible: false, enabled: false }),
        );
        dispatch(setCurrentPolicy(data));
        dispatch(setPoliciesSideMenuOpen(true));
      }}
      sx={{ position: 'relative' }}
    >
      <Box className="integrationitemlogo">{<RiFileList3Line />}</Box>
      <Box>{data.name}</Box>
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

export default PolicyItem;
