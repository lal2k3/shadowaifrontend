import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { basicLogin } from 'store/reducers/auth';

const BasicLoginButton = () => {
  const user = useSelector((state: IRootState) => state.auth.login.basic.user);
  const loading = useSelector((state: IRootState) => state.auth.login.loading);

  const password = useSelector(
    (state: IRootState) => state.auth.login.basic.password,
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button
      onClick={() => dispatch(basicLogin({ user, password }))}
      variant="contained"
      disabled={loading}
    >
      Login
    </Button>
  );
};

export default BasicLoginButton;
