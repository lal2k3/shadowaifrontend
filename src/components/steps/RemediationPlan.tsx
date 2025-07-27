import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { TestResult } from 'mocks/testResultsMockData'; // Assuming the path is correct

// Helper function to extract query parameters from the URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface RemediationPlanProps {
  packageName: string;
  packageVersion: string;
  cveId: string;
  updateVersion: string;
  testResults: TestResult | null;
  onDirectToMitigation: (cveId: string, hasDiff: boolean) => void;
}

const RemediationPlan: React.FC<RemediationPlanProps> = ({
  packageName,
  packageVersion,
  cveId,
  updateVersion,
  testResults,
  onDirectToMitigation,
}) => {
  const query = useQuery();
  const serviceName = query.get('service');

  const [step, setStep] = useState(0); // Tracks the current step in the CI pipeline
  const [loading, setLoading] = useState(true); // Controls the loading state (spinner)
  const [pipelineFailed, setPipelineFailed] = useState(false); // Track if pipeline fails
  const [currentStepFinished, setCurrentStepFinished] = useState(false); // Track if step finished
  const steps = ['Build', 'Tests', 'AI Generated Tests', 'PR and Deploy'];

  const getStatusColor = (status: 'Pass' | 'Fail') => (status === 'Pass' ? 'green' : 'red');
  const [stopRun, setStopRun] = useState(false);

  const hasDiff = testResults?.passFailComparison.some((test) => test.status === 'Fail') || false;
  useEffect(() => {
    
    if (step < steps.length && !pipelineFailed) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setCurrentStepFinished(true); // Mark the current step as finished

        // Only stop the pipeline after the step is fully completed and colored
        if (step === 1 && hasDiff) {
          setPipelineFailed(true); // Mark the pipeline as failed after the Tests step completes
        } else if (step === 0 && testResults?.buildResult.status === 'Fail') {
          setPipelineFailed(true); // Mark the pipeline as failed after the Build step completes
        } else {
          setStep(step + 1); // Move to the next step only if the current one passed
          setCurrentStepFinished(false); // Reset for the next step
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, pipelineFailed, hasDiff, testResults]);

  if (!testResults || !testResults.buildResult) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4">Remediation Plan</Typography>
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Service: {serviceName || 'N/A'}</Typography>
            <Typography variant="h6">CVE: {cveId}</Typography>
            <Typography variant="h6">Package: {packageName}</Typography>
            <Typography variant="h6">Version: {packageVersion}</Typography>
            <Typography variant="h6">Recommended Remediated Version: {updateVersion}</Typography>
          </CardContent>
        </Card>
        <Typography variant="h6" color="error">
          Test results are not available at this time.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4">Remediation Plan</Typography>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">Service: {serviceName || 'N/A'}</Typography>
          <Typography variant="h6">CVE: {cveId}</Typography>
          <Typography variant="h6">Package: {packageName}</Typography>
          <Typography variant="h6">Version: {packageVersion}</Typography>
          <Typography variant="h6">Recommended Remediated Version: {updateVersion}</Typography>
        </CardContent>
      </Card>

      {/* Remediation Pipeline */}
      <Typography variant="h5" sx={{ marginTop: 4 }}>
        Remediation Pipeline
      </Typography>

      <Grid container spacing={3}>
        {/* Baseline Pipeline */}
        <Grid item xs={12}>
          <Typography variant="h6">Baseline</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Build Phase */}
            <Box
              sx={{
                backgroundColor: step >= 1 ? getStatusColor(testResults.buildResult.status) : 'gray',
                padding: 2,
                color: 'white',
                borderRadius: '4px',
                animation: loading && step === 0 ? 'flash 2s infinite' : 'none',
              }}
            >
              Build
            </Box>

            {/* Tests Phase */}
            <Button
              sx={{ padding: 0, textTransform: 'none' }}
              onClick={() => onDirectToMitigation(cveId, hasDiff)}
              disabled={loading || step < 1}
            >
              <Box
                sx={{
                    backgroundColor: step >= 1 && !loading && hasDiff ? getStatusColor('Fail') : step >= 2 && !hasDiff ? getStatusColor('Pass') : 'gray',
                    padding: 2,
                  color: 'white',
                  borderRadius: '4px',
                  animation: loading && step === 1 ? 'flash 2s infinite' : 'none',
                }}
              >
                Tests
              </Box>
            </Button>
          </Box>
        </Grid>

        {/* Remediated Version Pipeline */}
        <Grid item xs={12}>
          <Typography variant="h6">Remediated Version</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Build Phase */}
            <Box
              sx={{
                backgroundColor: step >= 1 ? getStatusColor(testResults.buildResult.status) : 'gray',
                padding: 2,
                color: 'white',
                borderRadius: '4px',
                animation: loading && step === 0 ? 'flash 2s infinite' : 'none',
              }}
            >
              Build
            </Box>

            {/* Test Comparison */}
            <Button
              sx={{ padding: 0, textTransform: 'none' }}
              onClick={() => onDirectToMitigation(cveId, hasDiff)}
              disabled={loading || step < 1}
            >
              <Box
                sx={{
                  backgroundColor: step >= 1 && !loading && hasDiff ? getStatusColor('Fail') : step >= 2 && !hasDiff ? getStatusColor('Pass') : 'gray',
                  padding: 2,
                  color: 'white',
                  borderRadius: '4px',
                  animation: loading && step === 1 ? 'flash 2s infinite' : 'none',
                }}
              >
                Tests
              </Box>
            </Button>

            {/* AI Generated Tests */}
            <Box
              sx={{
                backgroundColor: step >= 3 && !pipelineFailed ? getStatusColor('Pass') : 'gray',
                padding: 2,
                color: 'white',
                borderRadius: '4px',
                animation: loading && step === 2 ? 'flash 2s infinite' : 'none',
              }}
            >
              AI Generated Tests
            </Box>

            {/* PR and Deploy */}
            <Box
              sx={{
                backgroundColor: step >= 4 && !pipelineFailed ? getStatusColor('Pass') : 'gray',
                padding: 2,
                color: 'white',
                borderRadius: '4px',
                animation: loading && step === 3 ? 'flash 2s infinite' : 'none',
              }}
            >
              PR and Deploy
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Flashing animation */}
      <style>
        {`
          @keyframes flash {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default RemediationPlan;
