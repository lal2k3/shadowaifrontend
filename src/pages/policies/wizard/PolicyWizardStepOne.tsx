import { Box, TextField, Typography, Switch, FormControlLabel, Grid, Paper, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import { PolicyKeyToEdit } from '../PolicyUtils';
import { policyUpdateValue, policyUpdateRule } from 'store/reducers/policies';

const PolicyWizardStepOne = () => {
  const currentPolicy = useSelector(
    (state: IRootState) => state.policies.currentPolicy,
  );
  const dispatch = useDispatch<AppDispatch>();

  const updateFieldValue = (
    field: PolicyKeyToEdit,
    value: string | boolean,
  ) => {
    dispatch(policyUpdateValue({ field, value }));
  };

  const updateRuleValue = (ruleKey: string, value: boolean) => {
    dispatch(policyUpdateRule({ ruleKey, value }));
  };

  // Get current rules or use defaults
  const getCurrentRules = () => {
    try {
      let policyData;
      if (typeof currentPolicy?.policy === 'string') {
        policyData = JSON.parse(currentPolicy.policy);
      } else {
        policyData = currentPolicy?.policy;
      }
      return policyData?.policy?.rules || {
        "filesFilter": true,
        "imageFilter": true,
        "iframeFilter": true,
        "enableEntropy": true,
        "enableKeywords": true,
        "enablePatterns": true,
        "enableSourceCode": true,
        "enableRegexChecks": true,
        "enableSensitiveKeyPatterns": true
      };
    } catch {
      return {
        "filesFilter": true,
        "imageFilter": true,
        "iframeFilter": true,
        "enableEntropy": true,
        "enableKeywords": true,
        "enablePatterns": true,
        "enableSourceCode": true,
        "enableRegexChecks": true,
        "enableSensitiveKeyPatterns": true
      };
    }
  };

  const currentRules = getCurrentRules();

  const ruleDescriptions = {
    "filesFilter": "Enable filtering based on file extensions",
    "imageFilter": "Enable image content analysis and filtering",
    "iframeFilter": "Enable iframe injection detection and blocking",
    "enableEntropy": "Enable entropy analysis for detecting random patterns",
    "enableKeywords": "Enable keyword-based detection",
    "enablePatterns": "Enable pattern matching using regex patterns",
    "enableSourceCode": "Enable source code analysis and detection",
    "enableRegexChecks": "Enable advanced regex-based security checks",
    "enableSensitiveKeyPatterns": "Enable detection of sensitive key patterns"
  };

  return (
    <Box className="policywizardstepone">
      <Box className="policywizardform" sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Policy Name"
          value={currentPolicy?.name || ''}
          onChange={(e) => updateFieldValue('name', e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Enter policy name"
        />

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Security Rules Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configure which security rules should be enabled for this policy. These settings determine how content will be analyzed and filtered.
          </Typography>
          
          <Grid container spacing={2}>
            {Object.entries(ruleDescriptions).map(([ruleKey, description]) => (
              <Grid item xs={12} key={ruleKey}>
                <Box sx={{ p: 2, border: '1px solid #f0f0f0', borderRadius: 1, backgroundColor: '#fafafa' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentRules[ruleKey] || false}
                        onChange={(e) => updateRuleValue(ruleKey, e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {ruleKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {description}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Note:</strong> The complete policy includes additional configurations (file extensions, keywords, patterns, etc.) 
              that will be automatically applied based on your organization&apos;s security template.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default PolicyWizardStepOne;
