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
      position: 'bottom' as const,
    },
    datalabels: {
      color: 'white',
      formatter: (value: number) =>
        `${Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(value)}$`,
    },
  },
};

const labels = ['Checkout', 'Sales Bot', 'List Items', 'Onboarding', 'Login'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Potential Loss in $',
      data: [50000, 40000, 30000, 20000, 10000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: [
        'rgba(255,0,0, 0.5)',
        'rgba(215,0,0, 0.5)',
        'rgba(175,0,0, 0.5)',
        'rgba(135,0,0, 0.5)',
        'rgba(95,0,0, 0.5)',
      ],
    },
  ],
};

export function TopPipelineAtRisk() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Bar options={options} data={data} />
    </Box>
  );
}
