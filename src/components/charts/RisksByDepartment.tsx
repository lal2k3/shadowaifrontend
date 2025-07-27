import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  DoughnutController,
);

export const data = {
  labels: ['DevOps', 'Development', 'AppSec'],
  datasets: [
    {
      data: [33, 41, 21],
      backgroundColor: [
        'rgba(255, 51, 51, 1)',
        'rgba(255, 153, 0, 1)',
        'rgba(230, 230, 0, 1)',
        'rgba(0, 204, 255, 1)',
      ],
      /*borderColor: [
        'rgb(255, 51, 51)',
        'rgb(255, 153, 0)',
        'rgb(230, 230, 0)',
        'rgb(0, 204, 255)',
      ],*/
      borderWidth: 1,
      borderRadius: 7,
      offset: 20,
    },
  ],
};

type ChartJsOptions =
  | {
      plugins: {
        legend: {
          position?: 'right' | 'left' | 'bottom' | 'top';
          display?: boolean;
        };
      };
    }
  | unknown;

const options: ChartJsOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    datalabels: {
      color: 'white',
    }
  },
};

export function RisksByDepartment() {
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
      <Chart type="doughnut" options={options} data={data} />
    </Box>
  );
}
