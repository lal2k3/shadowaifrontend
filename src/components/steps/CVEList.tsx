import React from 'react';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { CVE } from '../../mocks/cveMockData';

interface CVEListProps {
  cveData: CVE[];
  onSelectCVE: (cve: CVE) => void;
  onDirectToMitigation: (cve: CVE, differences: boolean) => void;
  onGoToRemediationPlan: (cve: CVE, differences: boolean) => void; // Add the new prop for navigating to Remediation Plan

}

const getRandomStatus = () => {
  const statuses = ['ready', 'not_ready'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const CVEList: React.FC<CVEListProps> = ({ cveData, onSelectCVE, onDirectToMitigation ,onGoToRemediationPlan}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ color: 'blue' }}>Top CVEs for Remediation</Typography>
      {cveData.map((cve) => {
        const status = getRandomStatus();
        const isReady = status === 'ready';

        return (
          <Accordion key={cve.id} sx={{ marginBottom: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${cve.id}-content`}
              id={`panel-${cve.id}-header`}
              sx={{ margin: 0 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: isReady ? 'green' : 'red',
                      marginRight: 1,
                    }}
                  />
                  <Typography variant="h6">{cve.id}</Typography>
                </Box>
                {/* <Typography variant="body2" sx={{ color: isReady ? 'green' : 'red', marginLeft: 2, alignSelf: 'center' }}>
                  {isReady
                    ? 'The remediation package was tested and is ready to deploy'
                    : 'Anomalies detected while trying to remediate'}
                </Typography> */}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{

            }}>
              <Accordion
                key={`${cve.id}-inner`}
                sx={{
                  marginTop: 0,   // Ensure no space between accordions
                  boxShadow: 'none', // Remove shadow to avoid inner accordion appearance
                  '&:before': { display: 'none' }, // Remove border before the inner accordion
                  padding: 0,
                  margin: 0,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${cve.id}-inner-content`}
                  id={`panel-${cve.id}-inner-header`}
                  sx={{ paddingLeft: 0 }} // Align it with the outer accordion
                >
                  <Typography variant="body1">{'Affected Services'}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <Box sx={{ marginTop: 0, paddingLeft: 2 }}>
                    {cve.service.map((service, index) => (
                      <Typography key={index} variant="body2" sx={{ margin: 0 }}>
                        <Link to={`?service=${service}`} style={{ textDecoration: 'none', color: 'blue' }}>
                          {`${index + 1}. ${service}`}
                        </Link>
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Typography variant="body2">Package: {cve.package}</Typography>
              <Typography variant="body2">Current Version: {cve.version}</Typography>
              <Typography variant="body2">Remediation Version: {cve.remediation_version}</Typography>
              <Typography variant="body2">Severity: {cve.severity}</Typography>
              <Typography variant="body2">CVSS Score: {cve.cvss}</Typography>
              <Typography variant="body2">Reachability: {cve.reachability}</Typography>
              {/* {isReady ? (
                <>
                  { <Button variant="contained" sx={{ marginTop: 2, borderRadius: '50px' }}>
                    Deploy
                  </Button> }
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2, marginLeft: 2, borderRadius: '50px' }}
                    onClick={() => onDirectToMitigation(cve, false)}
                  >
                    What was tested
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, borderRadius: '50px' }}
                  onClick={() => onDirectToMitigation(cve, true)}
                >
                  Investigate
                </Button>
              )} */
              }
              <Button
                  variant="contained"
                  sx={{ marginTop: 2, borderRadius: '50px' }}
                  onClick={() => onGoToRemediationPlan(cve,!isReady)} // Add this handler to navigate to Remediation Plan
                  >
                  Go To Remediation Plan
                </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default CVEList;

