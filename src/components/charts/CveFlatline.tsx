import { Box } from '@mui/material';
import FlatlineChart, {
  FlatlineChartOptions,
  FlatlineChatData,
} from './FlatlineChart/FlatlineChart';

const data: FlatlineChatData = {
  labels: ['Critical', 'High', 'Medium', 'Low'],
  values: [15, 6, 21, 30],
};

const options: FlatlineChartOptions = {
  colors: [
    'rgba(255, 51, 51, 0.5)',
    'rgba(255, 153, 0, 0.5)',
    'rgba(230, 230, 0, 0.4)',
    'rgba(0, 204, 255, 0.5)',
  ],
  gap: '3px',
  thinkness: '25px',
};

export function CveFlatline() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <FlatlineChart options={options} data={data} />
    </Box>
  );
}
