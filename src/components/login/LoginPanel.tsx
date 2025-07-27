import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setBasicPassword, setBasicUser } from 'store/reducers/auth';

const LoginPanel = () => {
  const dispatch = useDispatch();

  return (
    <Box className="userpasspanel">
      <Box>Please provide your username and password</Box>
      <TextField
        label="Username"
        variant="outlined"
        onChange={(e) => dispatch(setBasicUser(e.target.value))}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        onChange={(e) => dispatch(setBasicPassword(e.target.value))}
      />
    </Box>
  );
};

export default LoginPanel;
