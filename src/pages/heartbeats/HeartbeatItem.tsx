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
  RiHeartLine, 
  RiEyeLine, 
  RiTimeLine,
  RiUserLine,
  RiRobotLine,
  RiShieldLine,
  RiInformationLine,
  RiSettings3Line
} from 'react-icons/ri';
import { Heartbeat } from 'store/reducers/heartbeats';
import { useState } from 'react';

interface Props {
  data: Heartbeat;
}

const HeartbeatItem = ({ data }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blocked': return 'error';
      case 'heartbeat': return 'success';
      case 'info': return 'info';
      case 'custom_event': return 'warning';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blocked': return <RiShieldLine size={24} color="#ff5722" />;
      case 'heartbeat': return <RiHeartLine size={24} color="#4caf50" />;
      case 'info': return <RiInformationLine size={24} color="#2196f3" />;
      case 'custom_event': return <RiSettings3Line size={24} color="#ff9800" />;
      default: return <RiHeartLine size={24} color="#666" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blocked': return 'Blocked Event';
      case 'heartbeat': return 'Heartbeat';
      case 'info': return 'Info Event';
      case 'custom_event': return 'Custom Event';
      default: return 'Unknown Event';
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

  const getMainContent = () => {
    switch (data.type) {
      case 'blocked':
        return data.blockedText || 'No blocked text available';
      case 'info':
        return data.userInput || 'No user input available';
      case 'custom_event':
        return data.eventData || 'No event data available';
      case 'heartbeat':
        return `Heartbeat from ${data.user.name} on ${data.system.platform}`;
      default:
        return 'No content available';
    }
  };

  const getRiskLevel = () => {
    switch (data.type) {
      case 'blocked': return 'HIGH';
      case 'custom_event': return 'MEDIUM';
      case 'info': return 'LOW';
      case 'heartbeat': return 'NONE';
      default: return 'UNKNOWN';
    }
  };

  const getRiskColor = () => {
    switch (getRiskLevel()) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      case 'NONE': return 'success';
      default: return 'default';
    }
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
              {getTypeIcon(data.type)}
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                {getTypeLabel(data.type)}
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
                label={`${getRiskLevel()} RISK`}
                color={getRiskColor()}
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
            {truncateText(getMainContent())}
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
                  Agent: {data.agent.name}
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
          {getTypeIcon(data.type)}
          {getTypeLabel(data.type)} Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box display="flex" gap={1} mb={3}>
            <Chip 
              label={data.type.toUpperCase()} 
              color={getTypeColor(data.type)}
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              label={`${getRiskLevel()} RISK`}
              color={getRiskColor()}
              variant="outlined"
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Content
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
            {getMainContent()}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Details
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>URL:</strong> {data.url}<br />
            <strong>Platform:</strong> {data.system.platform}<br />
            {data.system.userAgent && (
              <>
                <strong>User Agent:</strong> {data.system.userAgent}<br />
              </>
            )}
            <strong>Local IPs:</strong> {data.system.localIPs.join(', ') || 'None'}<br />
            <strong>Device UUID:</strong> {data.system.fingerprint.uuid}
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
                <strong>Agent:</strong> {data.agent.name} (ID: {data.agentId})
              </Typography>
            </Box>
            {data.user.chromeProfile && (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">
                  <strong>Chrome Profile:</strong> {data.user.chromeProfile.email} (ID: {data.user.chromeProfile.id})
                </Typography>
              </Box>
            )}
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

export default HeartbeatItem;