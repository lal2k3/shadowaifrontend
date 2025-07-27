import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuBar from '../menubar/MenuBar';
import { AppConfig } from './AppConfig';
import useScreenSize from 'hooks/useScreenSize';
import LoginDrawer from 'components/login/LoginDrawer';

const MainPanel = () => {
  const screenSize = useScreenSize();
  const mode =
    screenSize.width > AppConfig.collapseWidth ? AppConfig.mode : 'vertical';

  return (
    <Box
      className='mainPanel' 
      sx={{
        display: 'flex',
        flexDirection: mode === 'vertical' ? 'column' : 'row',
        alignItems: 'start',
        direction: AppConfig.dir,
      }}
    >
      <LoginDrawer />
      <MenuBar />
      <Box className='content'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainPanel;
