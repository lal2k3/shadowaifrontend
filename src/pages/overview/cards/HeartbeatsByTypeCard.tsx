import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import CustomCard from 'components/customCard/CustomCard';
import { RiBarChartLine } from 'react-icons/ri';
import { fetchHeartbeatsByType } from 'store/reducers/heartbeatWidgets';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, DoughnutController);

const HeartbeatsByTypeCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { heartbeatsByType, loading, errors } = useSelector((state: IRootState) => state.heartbeatWidgets);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchHeartbeatsByType());
    }
  }, [dispatch, token]);

  const getTypeColor = (type: string, index: number) => {
    switch (type) {
      case 'blocked': return 'rgba(244, 67, 54, 1)';
      case 'heartbeat': return 'rgba(76, 175, 80, 1)';
      case 'info': return 'rgba(33, 150, 243, 1)';
      case 'custom_event': return 'rgba(255, 152, 0, 1)';
      default: return `rgba(${100 + index * 40}, ${100 + index * 40}, ${100 + index * 40}, 1)`;
    }
  };

  if (loading.byType || errors.byType || heartbeatsByType.length === 0) {
    return (
      <CustomCard
        className="cveDoughnutCard homepagecard firstRowCard"
        title="Heartbeats by Type"
        titleLogo={<RiBarChartLine />}
      >
        <Box
          sx={{
            width: '100%',
            height: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {loading.byType ? 'Loading...' : errors.byType || 'No data available'}
        </Box>
      </CustomCard>
    );
  }

  const data = {
    labels: heartbeatsByType.map(item => item.type.charAt(0).toUpperCase() + item.type.slice(1)),
    datasets: [
      {
        data: heartbeatsByType.map(item => item.count),
        backgroundColor: heartbeatsByType.map((item, index) => getTypeColor(item.type, index)),
        borderWidth: 1,
        borderRadius: 7,
        offset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      datalabels: {
        color: 'white',
      }
    },
  };

  return (
    <CustomCard
      className="cveDoughnutCard homepagecard"
      title="Heartbeats by Type"
      titleLogo={<RiBarChartLine />}
    >
      <Box
        sx={{
          width: '100%',
          height: '300px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Chart type="doughnut" options={options} data={data} />
      </Box>
    </CustomCard>
  );
};

export default HeartbeatsByTypeCard;