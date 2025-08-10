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
import { RiShieldLine } from 'react-icons/ri';
import { fetchTopBlockedUsers } from 'store/reducers/heartbeatWidgets';
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

const TopBlockedUsersCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topBlockedUsers, loading, errors } = useSelector((state: IRootState) => state.heartbeatWidgets);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchTopBlockedUsers());
    }
  }, [dispatch, token]);

  if (loading.topBlocked || errors.topBlocked || topBlockedUsers.length === 0) {
    return (
      <CustomCard
        className="piplelinesCard homepagecard"
        title="Top Blocked Users"
        titleLogo={<RiShieldLine />}
      >
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {loading.topBlocked ? 'Loading...' : errors.topBlocked || 'No blocked users'}
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
    labels: topBlockedUsers.slice(0, 5).map(user => user.userName),
    datasets: [
      {
        data: topBlockedUsers.slice(0, 5).map(user => user.count),
        borderRadius: 15,
        backgroundColor: [
          'rgba(244, 67, 54, 1)',
          'rgba(255, 87, 34, 1)', 
          'rgba(255, 152, 0, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(205, 220, 57, 1)',
        ],
      },
    ],
  };

  return (
    <CustomCard
      className="piplelinesCard homepagecard"
      title="Top Blocked Users"
      titleLogo={<RiShieldLine />}
    >
      <Box sx={{ width: '100%', height: '100%' }}>
        <Bar options={options} data={data} />
      </Box>
    </CustomCard>
  );
};

export default TopBlockedUsersCard;