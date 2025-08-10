import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  LinearProgress,
  Paper
} from '@mui/material';
import CustomCard from 'components/customCard/CustomCard';
import { RiGlobalLine, RiRobotLine } from 'react-icons/ri';
import { fetchTopPlatforms } from 'store/reducers/heartbeatWidgets';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

const TopPlatformsCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topPlatforms, loading, errors } = useSelector((state: IRootState) => state.heartbeatWidgets);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchTopPlatforms());
    }
  }, [dispatch, token]);

  const getPlatformIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('chatgpt') || lowerPlatform.includes('openai')) return '🤖';
    if (lowerPlatform.includes('claude')) return '🧠';
    if (lowerPlatform.includes('gemini') || lowerPlatform.includes('bard')) return '✨';
    if (lowerPlatform.includes('github')) return '🐙';
    if (lowerPlatform.includes('copilot')) return '👨‍💻';
    return '🔧';
  };

  const getPlatformColor = (index: number) => {
    const colors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336', '#607d8b'];
    return colors[index % colors.length];
  };

  const maxCount = topPlatforms.length > 0 ? Math.max(...topPlatforms.map(p => p.count)) : 1;
  const totalCount = topPlatforms.reduce((sum, platform) => sum + platform.count, 0);

  if (loading.platforms) {
    return (
      <CustomCard
        className="piplelinesCard homepagecard"
        title="Top AI Platforms"
        titleLogo={<RiGlobalLine />}
      >
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      </CustomCard>
    );
  }

  if (errors.platforms) {
    return (
      <CustomCard
        className="piplelinesCard homepagecard"
        title="Top AI Platforms"
        titleLogo={<RiGlobalLine />}
      >
        <Alert severity="error" sx={{ mt: 2 }}>
          {errors.platforms}
        </Alert>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      className="piplelinesCard homepagecard"
      title="Top AI Platforms"
      titleLogo={<RiGlobalLine />}
    >
      {topPlatforms.length > 0 ? (
        <Box sx={{ width: '100%', paddingTop: '10px' }}>
          {topPlatforms.slice(0, 6).map((platform, index) => {
            const percentage = maxCount > 0 ? (platform.count / maxCount) * 100 : 0;
            const sharePercentage = totalCount > 0 ? ((platform.count / totalCount) * 100).toFixed(1) : '0';
            const color = getPlatformColor(index);
            
            return (
              <Paper
                key={platform.platform}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 1.5,
                  backgroundColor: `${color}08`,
                  border: `1px solid ${color}30`,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: `${color}15`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${color}20`,
                    transition: 'all 0.2s ease-in-out',
                  }
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                      {getPlatformIcon(platform.platform)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {platform.platform}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color }}>
                      {platform.count}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {sharePercentage}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: `${color}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: color,
                      borderRadius: 3,
                    },
                  }}
                />
              </Paper>
            );
          })}
          
          {topPlatforms.length > 6 && (
            <Box textAlign="center" mt={2}>
              <Typography variant="caption" color="text.secondary">
                Showing top 6 of {topPlatforms.length} platforms
              </Typography>
            </Box>
          )}
          
          <Box 
            textAlign="center" 
            mt={2} 
            p={1} 
            sx={{ 
              backgroundColor: 'primary.main', 
              color: 'primary.contrastText',
              borderRadius: 2 
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Total Usage: {totalCount} interactions
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          height="200px"
          color="text.secondary"
        >
          <RiRobotLine size={48} style={{ marginBottom: 8, opacity: 0.5 }} />
          <Typography variant="body2">No platform data available</Typography>
        </Box>
      )}
    </CustomCard>
  );
};

export default TopPlatformsCard;