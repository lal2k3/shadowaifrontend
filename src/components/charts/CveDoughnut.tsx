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
  labels: ['Critical', 'High', 'Medium', 'Low'],
  datasets: [
    {
      data: [15, 6, 21, 30],
      backgroundColor: [
        'rgba(255, 51, 51, 0.5)',
        'rgba(255, 153, 0, 0.5)',
        'rgba(230, 230, 0, 0.4)',
        'rgba(0, 204, 255, 0.5)',
      ],
      borderColor: [
        'rgb(255, 51, 51)',
        'rgb(255, 153, 0)',
        'rgb(230, 230, 0)',
        'rgb(0, 204, 255)',
      ],
      borderWidth: 1,
    },
  ],
};

type ChartJsOptions =
  | {
      plugins: {
        legend: {
          position?: 'right' | 'left';
          display?: boolean;
        };
      };
    }
  | unknown;

const options: ChartJsOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'left'
    },
  },
  rotation: -90,
  circumference: 180,
};

export function CveDoughnut() {
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
