import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import PolicyWizard from './wizard/PolicyWizard';
import { setPoliciesSideMenuOpen } from 'store/reducers/policies';

const PolicyDrawer = () => {
  const isOpen = useSelector(
    (state: IRootState) => state.policies.sidemenu.open,
  );
  const dispatch = useDispatch();

  return (
    <Drawer
      open={isOpen}
      onClose={() => dispatch(setPoliciesSideMenuOpen(false))}
      anchor="right"
      PaperProps={{
        className: 'integrationsdrawer',
      }}
    >
      <PolicyWizard />
    </Drawer>
  );
};

export default PolicyDrawer;
