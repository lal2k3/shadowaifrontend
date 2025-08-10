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
import { RiSearchLine, RiShieldLine, RiFilterLine } from 'react-icons/ri';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlockedPromptItem from './BlockedPromptItem';
import { fetchBlockedPrompts, BlockedPrompt } from 'store/reducers/blockedPrompts';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

const BlockedPromptsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blockedPrompts, loading, error } = useSelector((state: IRootState) => state.blockedPrompts);
  const token = useSelector((state: IRootState) => state.auth.token);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  useEffect(() => {
    if (token) {
      dispatch(fetchBlockedPrompts());
    }
  }, [dispatch, token]);

  const filteredPrompts = useMemo(() => {
    return blockedPrompts.filter((prompt: BlockedPrompt) => {
      const matchesSearch = prompt.blockedText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || prompt.type === typeFilter;
      const matchesDepartment = departmentFilter === 'all' || prompt.user.department === departmentFilter;
      
      return matchesSearch && matchesType && matchesDepartment;
    });
  }, [blockedPrompts, searchTerm, typeFilter, departmentFilter]);

  const getStatsCount = (filterType: 'type' | 'department', value: string) => {
    if (filterType === 'department') {
      return blockedPrompts.filter((prompt: BlockedPrompt) => prompt.user.department === value).length;
    }
    return blockedPrompts.filter((prompt: BlockedPrompt) => prompt[filterType] === value).length;
  };

  const getUniqueDepartments = () => {
    return Array.from(new Set(blockedPrompts.map((prompt: BlockedPrompt) => prompt.user.department)));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Box textAlign="center">
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Loading blocked prompts...
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
            Failed to Load Blocked Prompts
          </Typography>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <RiShieldLine size={32} color="#ff5722" />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Blocked Prompts
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
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search prompts or reasons..."
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="blocked">Blocked ({getStatsCount('type', 'blocked')})</MenuItem>
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
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Overview Statistics
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Chip 
            label={`Total: ${blockedPrompts.length}`} 
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
            label={`Departments: ${getUniqueDepartments().length}`} 
            color="info" 
            variant="outlined"
          />
          <Chip 
            label={`This Month: ${blockedPrompts.filter(p => new Date(p.timestamp).getMonth() === new Date().getMonth()).length}`} 
            color="warning" 
            variant="outlined"
          />
        </Box>
      </Paper>

      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Blocked Prompts ({filteredPrompts.length})
          </Typography>
        </Box>

        {filteredPrompts.length === 0 ? (
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
            <RiShieldLine size={64} color="#ccc" />
            <Typography variant="h5" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
              {searchTerm || typeFilter !== 'all' || departmentFilter !== 'all' 
                ? 'No prompts match your filters' 
                : 'No blocked prompts found'
              }
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm || typeFilter !== 'all' || departmentFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Great! There are no blocked prompts at the moment.'
              }
            </Typography>
          </Paper>
        ) : (
          <Box>
            {filteredPrompts.map((prompt: BlockedPrompt) => (
              <BlockedPromptItem key={prompt._id} data={prompt} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BlockedPromptsPanel;