import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TestViewer from './TestStudio/TestViewer';
import { Test } from 'types';

interface TestGenerationProps {
  onBack: () => void;
  onNext: () => void;
  generatedTests: Test[];
}

const TestGeneration: React.FC<TestGenerationProps> = ({ onBack, onNext, generatedTests }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ color: 'blue' }}>Test Suite</Typography>

      <TestViewer tests={generatedTests} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" onClick={onBack} sx={{ borderRadius: '50px' }}>Back to Remediation</Button>
        <Button variant="contained" onClick={onNext} sx={{ borderRadius: '50px' }}>Mitigation and Tests</Button>
      </Box>
    </Box>
  );
};

export default TestGeneration;
