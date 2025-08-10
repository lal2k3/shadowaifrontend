import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CustomCard from 'components/customCard/CustomCard';
import { RiBuilding2Line } from 'react-icons/ri';
import { fetchDepartmentStats } from 'store/reducers/heartbeatWidgets';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentStatsCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { departmentStats, loading, errors } = useSelector((state: IRootState) => state.heartbeatWidgets);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchDepartmentStats());
    }
  }, [dispatch, token]);

  const getDepartmentColor = (index: number) => {
    const colors = [
      '#4caf50', '#2196f3', '#ff9800', '#9c27b0', 
      '#f44336', '#607d8b', '#795548', '#e91e63'
    ];
    return colors[index % colors.length];
  };

  const getDepartmentIcon = (department: string) => {
    const lowerDept = department.toLowerCase();
    if (lowerDept.includes('engineer')) return '👨‍💻';
    if (lowerDept.includes('design')) return '🎨';
    if (lowerDept.includes('marketing')) return '📢';
    if (lowerDept.includes('sales')) return '💼';
    if (lowerDept.includes('hr') || lowerDept.includes('human')) return '👥';
    if (lowerDept.includes('finance')) return '💰';
    if (lowerDept.includes('legal')) return '⚖️';
    if (lowerDept.includes('operations') || lowerDept.includes('ops')) return '⚙️';
    return '🏢';
  };

  const chartData = {
    labels: departmentStats.map(dept => dept.department),
    datasets: [
      {
        label: 'AI Usage',
        data: departmentStats.map(dept => dept.count),
        backgroundColor: departmentStats.map((_, index) => getDepartmentColor(index)),
        borderColor: departmentStats.map((_, index) => getDepartmentColor(index)),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function(context: {label: string}[]) {
            return context[0].label;
          },
          label: function(context: {parsed: {y: number}}) {
            const total = departmentStats.reduce((sum, dept) => sum + dept.count, 0);
            const percentage = total > 0 ? ((context.parsed.y / total) * 100).toFixed(1) : '0';
            return `Usage: ${context.parsed.y} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  const totalUsage = departmentStats.reduce((sum, dept) => sum + dept.count, 0);
  const topDepartment = departmentStats.length > 0 
    ? departmentStats.reduce((prev, current) => (prev.count > current.count) ? prev : current)
    : null;

  if (loading.departments) {
    return (
      <CustomCard
        className="cveDoughnutCard homepagecard"
        title="Usage by Department"
        titleLogo={<RiBuilding2Line />}
      >
        <Box display="flex" justifyContent="center" alignItems="center" height="250px">
          <CircularProgress />
        </Box>
      </CustomCard>
    );
  }

  if (errors.departments) {
    return (
      <CustomCard
        className="cveDoughnutCard homepagecard"
        title="Usage by Department"
        titleLogo={<RiBuilding2Line />}
      >
        <Alert severity="error" sx={{ mt: 2 }}>
          {errors.departments}
        </Alert>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      className="cveDoughnutCard homepagecard"
      title="Usage by Department"
      titleLogo={<RiBuilding2Line />}
    >
      {departmentStats.length > 0 ? (
        <>
          <Box sx={{ height: '200px', mb: 2 }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
          
          <Box 
            display="flex" 
            justifyContent="space-around" 
            sx={{ 
              backgroundColor: 'grey.50', 
              borderRadius: 2, 
              p: 1.5,
              mb: 2
            }}
          >
            <Box textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {totalUsage}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Usage
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                {departmentStats.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Departments
              </Typography>
            </Box>
            {topDepartment && (
              <Box textAlign="center">
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {getDepartmentIcon(topDepartment.department)} {topDepartment.department}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Top Usage ({topDepartment.count})
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
            {departmentStats.slice(0, 4).map((dept, index) => (
              <Box 
                key={dept.department}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: `${getDepartmentColor(index)}20`,
                  border: `1px solid ${getDepartmentColor(index)}40`,
                }}
              >
                <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                  {getDepartmentIcon(dept.department)}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {dept.department}: {dept.count}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          height="250px"
          color="text.secondary"
        >
          <RiBuilding2Line size={48} style={{ marginBottom: 8, opacity: 0.5 }} />
          <Typography variant="body2">No department data available</Typography>
        </Box>
      )}
    </CustomCard>
  );
};

export default DepartmentStatsCard;