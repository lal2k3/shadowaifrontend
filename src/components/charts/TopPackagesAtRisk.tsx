import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      color: 'white',
      formatter: (value: number) =>
        `${Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(value)}`,
    },
  },
};

const labels = ['Log4j', 'Ubunto 14.1', 'Ngnix', 'MariaDB', 'xz'];

export const data = {
  labels,
  datasets: [
    {
      data: [53, 44, 31, 19, 8],
      borderRadius: 15,
      backgroundColor: [
        'rgba(255,0,0, 1)',
        'rgba(215,0,0, 1)',
        'rgba(175,0,0, 1)',
        'rgba(135,0,0, 1)',
        'rgba(95,0,0, 1)',
      ],
    },
  ],
};

export function TopPackagesAtRisk() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Bar options={options} data={data} />
    </Box>
  );
}
