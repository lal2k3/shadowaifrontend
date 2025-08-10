import { 
  Box, 
  CircularProgress, 
  Alert, 
  Typography, 
  Container,
  Paper,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import { RiSearchLine, RiHeartLine, RiFilterLine } from 'react-icons/ri';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeartbeatItem from './HeartbeatItem';
import { fetchHeartbeats, Heartbeat } from 'store/reducers/heartbeats';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

const HeartbeatsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { heartbeats, loading, error } = useSelector((state: IRootState) => state.heartbeats);
  const token = useSelector((state: IRootState) => state.auth.token);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  useEffect(() => {
    if (token) {
      dispatch(fetchHeartbeats());
    }
  }, [dispatch, token]);

  const getRiskLevel = (heartbeat: Heartbeat) => {
    switch (heartbeat.type) {
      case 'blocked': return 'high';
      case 'custom_event': return 'medium';
      case 'info': return 'low';
      case 'heartbeat': return 'none';
      default: return 'unknown';
    }
  };

  const filteredHeartbeats = useMemo(() => {
    return heartbeats.filter((heartbeat: Heartbeat) => {
      const getMainContent = () => {
        switch (heartbeat.type) {
          case 'blocked':
            return heartbeat.blockedText || '';
          case 'info':
            return heartbeat.userInput || '';
          case 'custom_event':
            return heartbeat.eventData || '';
          case 'heartbeat':
            return `Heartbeat from ${heartbeat.user.name}`;
          default:
            return '';
        }
      };

      const matchesSearch = getMainContent().toLowerCase().includes(searchTerm.toLowerCase()) ||
                           heartbeat.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           heartbeat.user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || heartbeat.type === typeFilter;
      const matchesDepartment = departmentFilter === 'all' || heartbeat.user.department === departmentFilter;
      const matchesRisk = riskFilter === 'all' || getRiskLevel(heartbeat) === riskFilter;
      
      return matchesSearch && matchesType && matchesDepartment && matchesRisk;
    });
  }, [heartbeats, searchTerm, typeFilter, departmentFilter, riskFilter]);

  const getStatsCount = (filterType: 'type' | 'department' | 'risk', value: string) => {
    if (filterType === 'department') {
      return heartbeats.filter((heartbeat: Heartbeat) => heartbeat.user.department === value).length;
    }
    if (filterType === 'risk') {
      return heartbeats.filter((heartbeat: Heartbeat) => getRiskLevel(heartbeat) === value).length;
    }
    return heartbeats.filter((heartbeat: Heartbeat) => heartbeat[filterType] === value).length;
  };

  const getUniqueDepartments = () => {
    return Array.from(new Set(heartbeats.map((heartbeat: Heartbeat) => heartbeat.user.department)));
  };

  const getUniqueTypes = () => {
    return Array.from(new Set(heartbeats.map((heartbeat: Heartbeat) => heartbeat.type)));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Loading heartbeats...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 3,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          <Typography variant="h6" gutterBottom>
            Failed to Load Heartbeats
          </Typography>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <RiHeartLine size={32} color="#4caf50" />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Heartbeats
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          backgroundColor: '#fafafa'
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <RiFilterLine size={20} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters & Search
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search heartbeats, content, users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiSearchLine />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2 
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Types</MenuItem>
                {getUniqueTypes().map((type) => (
                  <MenuItem key={type} value={type}>
                    {type} ({getStatsCount('type', type)})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={departmentFilter}
                label="Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Departments</MenuItem>
                {getUniqueDepartments().map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept} ({getStatsCount('department', dept)})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={riskFilter}
                label="Risk Level"
                onChange={(e) => setRiskFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Risk Levels</MenuItem>
                <MenuItem value="high">High Risk ({getStatsCount('risk', 'high')})</MenuItem>
                <MenuItem value="medium">Medium Risk ({getStatsCount('risk', 'medium')})</MenuItem>
                <MenuItem value="low">Low Risk ({getStatsCount('risk', 'low')})</MenuItem>
                <MenuItem value="none">No Risk ({getStatsCount('risk', 'none')})</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Overview Statistics
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Chip 
            label={`Total: ${heartbeats.length}`} 
            color="primary" 
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip 
            label={`Blocked: ${getStatsCount('type', 'blocked')}`} 
            color="error" 
            variant="filled"
          />
          <Chip 
            label={`Info Events: ${getStatsCount('type', 'info')}`} 
            color="info" 
            variant="filled"
          />
          <Chip 
            label={`Heartbeats: ${getStatsCount('type', 'heartbeat')}`} 
            color="success" 
            variant="filled"
          />
          <Chip 
            label={`Custom Events: ${getStatsCount('type', 'custom_event')}`} 
            color="warning" 
            variant="filled"
          />
          <Chip 
            label={`Departments: ${getUniqueDepartments().length}`} 
            color="secondary" 
            variant="outlined"
          />
          <Chip 
            label={`Today: ${heartbeats.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length}`} 
            color="primary" 
            variant="outlined"
          />
        </Box>
      </Paper>

      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Heartbeats ({filteredHeartbeats.length})
          </Typography>
        </Box>

        {filteredHeartbeats.length === 0 ? (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              borderRadius: 3,
              border: '2px dashed #e0e0e0',
              backgroundColor: '#fafafa'
            }}
          >
            <RiHeartLine size={64} color="#ccc" />
            <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
              {searchTerm || typeFilter !== 'all' || departmentFilter !== 'all' || riskFilter !== 'all'
                ? 'No heartbeats match your filters' 
                : 'No heartbeats found'
              }
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm || typeFilter !== 'all' || departmentFilter !== 'all' || riskFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Heartbeat data will appear here when available.'
              }
            </Typography>
          </Paper>
        ) : (
          <Box>
            {filteredHeartbeats.map((heartbeat: Heartbeat) => (
              <HeartbeatItem key={heartbeat._id} data={heartbeat} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HeartbeatsPanel;