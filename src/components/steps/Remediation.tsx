import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { CVE } from '../../mocks/cveMockData';
import UserJourneyMap from 'components/steps/UserJourneyMap';

interface RemediationProps {
    selectedCVE: CVE;
    onBack: () => void;
    onRemediate: (data: unknown) => void;
}

const Remediation: React.FC<RemediationProps> = ({ selectedCVE, onBack, onRemediate }) => {
    const [additionalFiles] = useState<FileList | null>(null);
    const [additionalInfo] = useState("");
    const [userJourneys, setUserJourneys] = useState<{ user: string; journey: string; payload: string }[]>([]);

    useEffect(() => {
        setUserJourneys(selectedCVE.userJourneys);
    }, [selectedCVE]);

    const handleRemediate = () => {
        const data = {
            additionalFiles,
            additionalInfo,
            userJourneys
        };
        onRemediate(data);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ color: 'blue' }}>Mitigation Options and Testing</Typography>
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ color: 'blue' }}>{selectedCVE.id} - Info</Typography>
                    <Typography>Affected Services:</Typography>
                    {selectedCVE.service.map((service, index) => (
                        <Typography key={index}>**  {service}</Typography>
                    ))}
                    <Typography>Package: {selectedCVE.package}</Typography>
                    <Typography>Current Version: {selectedCVE.version}</Typography>
                    <Typography>Severity: {selectedCVE.severity}</Typography>
                    <Typography>CVSS Score: {selectedCVE.cvss}</Typography>
                    <Typography>Reachability: {selectedCVE.reachability}</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <Typography variant="h6" sx={{ color: 'blue' }}>Mitigation Options</Typography>
                <CardContent>
                    <Typography>Current Version: {selectedCVE.version}</Typography>
                    <Typography>Remediation Version: {selectedCVE.remediation_version}</Typography>
                </CardContent>
            </Card>

            <Typography variant="h6" sx={{ color: 'blue' }}>Top User Journeys based on the endpoints relevant to this package</Typography>
            <Grid container spacing={2}>
                {userJourneys.map((journey, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <UserJourneyMap journey={journey.journey} user={journey.user} payload={journey.payload} service={selectedCVE.service[0]} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="contained" onClick={onBack} sx={{ borderRadius: '50px' }}>Back to CVE List</Button>
                <Button variant="contained" onClick={handleRemediate} sx={{ borderRadius: '50px' }}>Remediate and Generate Tests</Button>
            </Box>
        </Box>
    );
};

export default Remediation;
