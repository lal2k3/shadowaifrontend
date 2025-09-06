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
  InputAdornment,
  Pagination,
  Stack
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
  const { heartbeats, pagination, loading, error } = useSelector((state: IRootState) => state.heartbeats);
  const token = useSelector((state: IRootState) => state.auth.token);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (token) {
      dispatch(fetchHeartbeats({ page: currentPage, limit: pageSize }));
    }
  }, [dispatch, token, currentPage, pageSize]);

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
    // Note: For now, we show all heartbeats from the current page
    // TODO: Implement server-side filtering to work with pagination
    if (searchTerm || typeFilter !== 'all' || departmentFilter !== 'all' || riskFilter !== 'all') {
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
    }
    
    return heartbeats;
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

      {(searchTerm || typeFilter !== 'all' || departmentFilter !== 'all' || riskFilter !== 'all') && (
        <Alert severity="info" sx={{ mb: 4, borderRadius: 3 }}>
          <Typography variant="body2">
            <strong>Note:</strong> Filters are applied to the current page only. For comprehensive filtering across all data, server-side filtering will be implemented in a future update.
          </Typography>
        </Alert>
      )}

      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Overview Statistics
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Chip 
            label={`Total: ${pagination?.total || 0}`} 
            color="primary" 
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip 
            label={`Current Page: ${heartbeats.length}`} 
            color="secondary" 
            variant="outlined"
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
            Heartbeats ({filteredHeartbeats.length} {pagination && `of ${pagination.total} total`})
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Per Page</InputLabel>
              <Select
                value={pageSize}
                label="Per Page"
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing page size
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Stack>
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
            
            {pagination && pagination.totalPages > 1 && (
              <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Page {pagination.page} of {pagination.totalPages}
                  </Typography>
                  <Pagination
                    count={pagination.totalPages}
                    page={pagination.page}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    siblingCount={1}
                    boundaryCount={2}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HeartbeatsPanel;