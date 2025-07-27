import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { CONNECTION_STATE, setLoginOpen, setToken } from 'store/reducers/auth';

const CommunicationInit = () => {
  const token = useSelector((state: IRootState) => state.auth.token);
  const state = useSelector((state: IRootState) => state.auth.state);
  const dispatch = useDispatch<AppDispatch>();

  const initComms = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          dispatch(setToken(null));
          dispatch(setLoginOpen(true));
        }
        return error;
      },
    );
  };

  const updateToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  useEffect(() => {
    initComms();

    if (token !== null) {
      updateToken(token);
    } else {
      if (state === CONNECTION_STATE.INIT) {
        dispatch(setLoginOpen(true));
      }
    }
  }, [token, state]);

  return <></>;
};

export default CommunicationInit;
