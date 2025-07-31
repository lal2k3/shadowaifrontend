import { Box, Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import LoginPanel from './LoginPanel';
import BasicLoginButton from './BasicLoginButton';
import LoginError from './LoginError';
//import { setDrawer } from 'store/reducers/integrations';

const LoginDrawer = () => {
  const isOpen = useSelector((state: IRootState) => state.auth.login.open);

  return (
    <Drawer
      open={isOpen}
      //onClose={() => dispatch(setDrawer({ isOpen: false }))}
      anchor="right"
      PaperProps={{
        className: 'logindrawer',
      }}
    >
      <Box className="logincontainer">
        <Box className="loginpanel">
          <Box className="header">
            <Box className="logintitle">
              In order to proceed please login to your account
            </Box>
          </Box>
          <Box className="loginpanelcontainer">
            <LoginPanel />
          </Box>
          <Box className="footer">
            <BasicLoginButton />
            <LoginError />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default LoginDrawer;
