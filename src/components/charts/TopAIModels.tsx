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

const labels = ['Claude', 'ChatGPT', 'Gemini', 'Copilot', 'Perplexity'];

export const data = {
  labels,
  datasets: [
    {
      data: [87, 76, 54, 43, 29],
      borderRadius: 15,
      backgroundColor: [
        'rgba(74, 144, 226, 1)',
        'rgba(58, 115, 181, 1)',
        'rgba(42, 86, 136, 1)',
        'rgba(26, 57, 91, 1)',
        'rgba(10, 28, 46, 1)',
      ],
    },
  ],
};

export function TopAIModels() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Bar options={options} data={data} />
    </Box>
  );
}