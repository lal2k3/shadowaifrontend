import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import CustomCard from 'components/customCard/CustomCard';
import { RiTrophyLine } from 'react-icons/ri';
import { fetchTopAIUsers } from 'store/reducers/heartbeatWidgets';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const TopAIUsersCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topAIUsers, loading, errors } = useSelector((state: IRootState) => state.heartbeatWidgets);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchTopAIUsers());
    }
  }, [dispatch, token]);

  if (loading.topUsers || errors.topUsers || topAIUsers.length === 0) {
    return (
      <CustomCard
        className="piplelinesCard homepagecard firstRowCard"
        title="Top AI Users"
        titleLogo={<RiTrophyLine />}
      >
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {loading.topUsers ? 'Loading...' : errors.topUsers || 'No data available'}
        </Box>
      </CustomCard>
    );
  }

  const options = {
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

  const data = {
    labels: topAIUsers.slice(0, 5).map(user => user.userName),
    datasets: [
      {
        data: topAIUsers.slice(0, 5).map(user => user.count),
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

  return (
    <CustomCard
      className="piplelinesCard homepagecard"
      title="Top AI Users"
      titleLogo={<RiTrophyLine />}
    >
      <Box sx={{ width: '100%', height: '300px' }}>
        <Bar options={options} data={data} />
      </Box>
    </CustomCard>
  );
};

export default TopAIUsersCard;