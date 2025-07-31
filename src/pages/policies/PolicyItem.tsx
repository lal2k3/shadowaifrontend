import { Box } from '@mui/material';
import { Policy } from './PolicyUtils';
import { RiFileList3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import {
  policySetWizardBackNavigation,
  policySetWizardNextNavigation,
  setCurrentPolicy,
  setPoliciesSideMenuOpen,
  setPolicyWizardStep,
} from 'store/reducers/policies';

interface Prop {
  data: Policy;
}

const PolicyItem = ({ data }: Prop) => {
  const dispatch = useDispatch<AppDispatch>();

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
    >
      <Box className="integrationitemlogo">{<RiFileList3Line />}</Box>
      <Box>{data.name}</Box>
    </Box>
  );
};

export default PolicyItem;
