import { Box } from '@mui/material';
import { MOCK_INTEGRATIONS } from 'mocks/mockIntegrations';
import { ReactNode } from 'react';
import IntegrationItem from './IntegrationItem';
import { AddNewIntegration } from './IntegrationsUtls';
import IntegrationDrawer from './IntegrationDrawer';

const IntegrationsPanel = () => {
  const data = MOCK_INTEGRATIONS;

  const renderIntegrations = () => {
    const integrationsElements: ReactNode[] = [];

    data.forEach((integration) => {
      integrationsElements.push(
        <IntegrationItem
          data={integration}
          key={`integration-item-${integration.id}`}
        />,
      );
    });

    return integrationsElements;
  };

  return (
    <Box className="integrationspanel">
      <IntegrationItem data={AddNewIntegration} />
      {renderIntegrations()}
      <IntegrationDrawer />
    </Box>
  );
};

export default IntegrationsPanel;
