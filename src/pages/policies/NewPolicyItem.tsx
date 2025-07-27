import { Box } from '@mui/material';
import { RiAddCircleFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import {
  setPolicyWizardStep,
  setPoliciesSideMenuOpen,
  policySetWizardNextNavigation,
  policySetWizardBackNavigation,
  EMPTY_POLICY,
  setCurrentPolicy,
} from 'store/reducers/policies';

const NewPolicyItem = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box
      className="integrationitem"
      onClick={() => {
        dispatch(setPolicyWizardStep(1));
        dispatch(
          policySetWizardNextNavigation({ visible: true, enabled: false }),
        );
        dispatch(
          policySetWizardBackNavigation({ visible: false, enabled: false }),
        );
        dispatch(setCurrentPolicy(EMPTY_POLICY));
        dispatch(setPoliciesSideMenuOpen(true));
      }}
    >
      <Box className="integrationitemlogo">{<RiAddCircleFill />}</Box>
      <Box>Add New Policy</Box>
    </Box>
  );
};

export default NewPolicyItem;
