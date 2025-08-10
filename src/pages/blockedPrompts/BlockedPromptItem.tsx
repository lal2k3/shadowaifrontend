import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { 
  RiShieldLine, 
  RiEyeLine, 
  RiTimeLine,
  RiUserLine,
  RiRobotLine
} from 'react-icons/ri';
import { BlockedPrompt } from 'store/reducers/blockedPrompts';
import { useState } from 'react';

interface Props {
  data: BlockedPrompt;
}

const BlockedPromptItem = ({ data }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blocked': return 'error';
      case 'allowed': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Card 
        sx={{ 
          mb: 2, 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
          '&:hover': { 
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          },
          borderRadius: 3,
          border: '1px solid #f0f0f0'
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <RiShieldLine size={24} color="#ff5722" />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Blocked Prompt
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Chip 
                label={data.type.toUpperCase()} 
                color={getTypeColor(data.type)}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                label="HIGH RISK" 
                color="error"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Typography 
            variant="body1" 
            color="text.primary" 
            sx={{ 
              mb: 2, 
              fontFamily: 'monospace', 
              backgroundColor: '#f8f9fa', 
              padding: '12px', 
              borderRadius: 2,
              border: '1px solid #e9ecef',
              fontSize: '0.9rem'
            }}
          >
            {truncateText(data.blockedText)}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, fontStyle: 'italic' }}
          >
            <strong>URL:</strong> {data.url}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" gap={2} alignItems="center">
              <Box display="flex" alignItems="center" gap={0.5}>
                <RiTimeLine size={16} />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(data.timestamp)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <RiUserLine size={16} />
                <Typography variant="caption" color="text.secondary">
                  {data.user.name} ({data.user.department})
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <RiRobotLine size={16} />
                <Typography variant="caption" color="text.secondary">
                  Agent: {data.agentId.slice(0, 8)}...
                </Typography>
              </Box>
            </Box>
            
            <Tooltip title="View Full Details">
              <IconButton 
                onClick={() => setShowDetails(true)}
                size="small"
                sx={{ 
                  color: 'primary.main',
                  '&:hover': { 
                    backgroundColor: 'primary.light',
                    color: 'primary.dark'
                  }
                }}
              >
                <RiEyeLine />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      <Dialog 
        open={showDetails} 
        onClose={() => setShowDetails(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <RiShieldLine size={24} color="#ff5722" />
          Blocked Prompt Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box display="flex" gap={1} mb={3}>
            <Chip 
              label={data.type.toUpperCase()} 
              color={getTypeColor(data.type)}
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              label="HIGH RISK" 
              color="error"
              variant="outlined"
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Prompt Content
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              mb: 3, 
              fontFamily: 'monospace', 
              backgroundColor: '#f8f9fa', 
              padding: '16px', 
              borderRadius: 2,
              border: '1px solid #e9ecef',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem'
            }}
          >
            {data.blockedText}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Details
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>URL:</strong> {data.url}<br />
            <strong>Platform:</strong> {data.system.platform}<br />
            <strong>User Agent:</strong> {data.system.userAgent}
          </Typography>

          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <RiTimeLine size={16} />
              <Typography variant="body2">
                <strong>Timestamp:</strong> {formatDate(data.timestamp)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <RiUserLine size={16} />
              <Typography variant="body2">
                <strong>User:</strong> {data.user.name} ({data.user.email})
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">
                <strong>Department:</strong> {data.user.department}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <RiRobotLine size={16} />
              <Typography variant="body2">
                <strong>Agent ID:</strong> {data.agentId}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
          <Button 
            onClick={() => setShowDetails(false)} 
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlockedPromptItem;