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

const labels = [
  'David Corn',
  'Shmuel Livni',
  'Alex Vilda',
  'Omer Melamed',
  'Luke Porter',
  'Deni Boldwin',
];

export const data = {
  labels,
  datasets: [
    {
      data: [29, 22, 17, 11, 8, 4],
      //borderColor: 'rgb(255, 99, 132)',
      borderRadius: 15,
      backgroundColor: [
        'rgba(255,0,0, 1)',
        'rgba(255, 51, 51, 1)',
        'rgba(255, 153, 0, 1)',
        'rgba(230, 230, 0, 1)',
        'rgba(0, 204, 255, 1)',
        'rgba(128, 179, 255, 1)',
      ],
    },
  ],
};

export function TopRiskOwners() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Bar options={options} data={data} />
    </Box>
  );
}
