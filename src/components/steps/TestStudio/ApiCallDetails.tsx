import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Test } from 'types';

export interface ApiCallDetailsProps {
  test: Test | null;
}

const ApiCallDetails: React.FC<ApiCallDetailsProps> = ({ test }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<unknown>, newIndex: number) => {
    setTabIndex(newIndex);
  };

  if (!test) {
    return <div className="api-call-details">Select a test to view details</div>;
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="API Call Details Tabs">
        <Tab label="Overview" />
        <Tab label="Headers" />
        <Tab label="Params" />
        <Tab label="Body" />
        <Tab label="Expected Result" />
      </Tabs>

      {tabIndex === 0 && (
        <Box p={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>API Overview</Typography>
          <Typography><strong>Method:</strong> {test.method}</Typography>
          <Typography><strong>URL:</strong> https://graph.facebook.com/{test.apiVersion}{test.endpoint}</Typography>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box p={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Headers</Typography>
          {test.headers.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Key</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {test.headers.map((header: { key: string, value: string }, index: number) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{header.key}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{header.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No headers</Typography>
          )}
        </Box>
      )}
      {tabIndex === 2 && (
        <Box p={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Params</Typography>
          {test.params.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Key</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {test.params.map((param: { key: string, value: string }, index: number) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{param.key}</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{param.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography>No params</Typography>
          )}
        </Box>
      )}
      {tabIndex === 3 && (
        <Box p={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Body</Typography>
          <pre style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>{test.body || 'No body'}</pre>
        </Box>
      )}
      {tabIndex === 4 && (
        <Box p={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Expected Result</Typography>
          <pre style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>{test.expectedResult || 'No expected result'}</pre>
        </Box>
      )}
    </Box>
  );
};

export default ApiCallDetails;
