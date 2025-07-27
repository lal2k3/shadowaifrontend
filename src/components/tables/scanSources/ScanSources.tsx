import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { loadScanSources } from 'store/reducers/risks';

const ScanSources = () => {
  const loading = useSelector((state: IRootState) => state.risks.loading);
  const scanSources = useSelector(
    (state: IRootState) => state.risks.scanSources,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadScanSources());
  }, []);

  const render = () => {
    if (loading) {
      return <Box>Loading</Box>;
    } else {
      return <Box>{`${JSON.stringify(scanSources)}`}</Box>;
    }
  };

  return <Box> {render()} </Box>;
};

export default ScanSources;
