import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';

const LoginError = () => {
  const error = useSelector((state: IRootState) => state.auth.error);
  const authCount = useSelector((state: IRootState) => state.auth.authCount);
  const displayText = authCount === 0 ? '' : error;

  if (error !== null) {
    return <Box className="errorcontainer">{displayText}</Box>;
  } else {
    return undefined;
  }
};

export default LoginError;
