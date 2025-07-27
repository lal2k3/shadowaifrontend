import { Box } from '@mui/material';
import { Integration, IntegrationsLogos } from './IntegrationsUtls';
import { useDispatch } from 'react-redux';
import { setDrawer, setWizardStep } from 'store/reducers/integrations';

interface Prop {
  data: Integration;
}

const InegrationItem = ({ data }: Prop) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (data.type === 'ADD_NEW') {
      dispatch(setWizardStep(1))
      dispatch(setDrawer({ isOpen: true, integration: data }));
    } else {
      dispatch(setDrawer({ isOpen: true, integration: data }));
    }
  };

  return (
    <Box className="integrationitem" onClick={() => handleClick()}>
      <Box className="integrationitemlogo">{IntegrationsLogos[data.type]}</Box>
      <Box>{data.name}</Box>
    </Box>
  );
};

export default InegrationItem;
