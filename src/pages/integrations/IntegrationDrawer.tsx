import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import { setDrawer } from 'store/reducers/integrations';
import IntegrationWizard from './wizard/IntegrationWizard';

const IntegrationDrawer = () => {
  const { isOpen, integration } = useSelector(
    (state: IRootState) => state.integrations.drawer,
  );
  const dispatch = useDispatch();

  const renderDrawer = () => {
    if (integration?.type === 'ADD_NEW') {
      return <IntegrationWizard />;
    } else {
      return undefined;
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={() => dispatch(setDrawer({ isOpen: false }))}
      anchor="right"
      PaperProps={{
        className: 'integrationsdrawer',
      }}
    >
      {renderDrawer()}
    </Drawer>
  );
};

export default IntegrationDrawer;
