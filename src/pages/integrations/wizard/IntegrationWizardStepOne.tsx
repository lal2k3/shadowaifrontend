import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import { IntegrationsLogos, IntegrationType } from '../IntegrationsUtls';
import { ReactNode, useEffect } from 'react';
import { dispatch } from 'store';
import { initStepConfig, updateFieldValue } from 'store/reducers/integrations';

const IntegrationWizardStepOne = () => {
  const wizard = useSelector((state: IRootState) => state.integrations.wizard);

  const config = wizard.config.find((config) => config.step === 1);
  const selectedTypeField = config?.data?.find(
    (field) => field.field === 'type',
  );
  const selectedType =
    selectedTypeField !== undefined ? selectedTypeField.value : 'NONE';

  useEffect(() => {
    dispatch(
      initStepConfig({
        step: 1,
        data: [
          {
            field: 'type',
            value: 'NONE',
          },
        ],
      }),
    );
  }, []);

  const renderIntegrations = () => {
    const integrationNodes: ReactNode[] = [];

    Object.keys(IntegrationsLogos).forEach((integration) => {
      if ((integration as IntegrationType) !== 'ADD_NEW') {
        const isSelected = selectedType === integration ? 'selected' : '';

        integrationNodes.push(
          <Box
            className={`integration ${isSelected}`}
            key={`wizardint-${integration}`}
            onClick={() =>
              dispatch(
                updateFieldValue({
                  step: 1,
                  field: 'type',
                  value: integration,
                }),
              )
            }
          >
            <Box className={`integrationlogo ${isSelected}`}>
              {IntegrationsLogos[integration as IntegrationType]}
            </Box>
          </Box>,
        );
      }
    });

    return integrationNodes;
  };

  return (
    <Box className="wizardintegrationsstepone">{renderIntegrations()}</Box>
  );
};

export default IntegrationWizardStepOne;
