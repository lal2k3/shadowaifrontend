import { Box, Button } from '@mui/material';
import { isEmpty } from 'components/general/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { IRootState } from 'store/reducers';
import {
  agentWizardNextStep,
  agentWizardPrevStep,
  createAgent,
  updateAgent,
} from 'store/reducers/agents';

const AgentWizardNavigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentAgent = useSelector(
    (state: IRootState) => state.agents.currentAgent,
  );
  const { navigation, step, totalSteps } = useSelector(
    (state: IRootState) => state.agents.wizard,
  );

  const renderBack = () => {
    const visibility = navigation.back.visible ? 'visible' : 'hidden';
    const enabled = navigation.back.enabled;

    return (
      <Box sx={{ visibility }}>
        <Button
          disabled={!enabled}
          variant="contained"
          onClick={() => dispatch(agentWizardPrevStep())}
        >
          Back
        </Button>
      </Box>
    );
  };

  const getNextText = () => {
    if (step === totalSteps) {
      if (isEmpty(currentAgent.id)) {
        return 'Create';
      } else {
        return 'Update';
      }
    } else {
      return 'Next';
    }
  };

  const nextAction = () => {
    if (step === totalSteps) {
      const agentData = {
        description: currentAgent.description,
        configuration: currentAgent.configuration || null,
        policyId: currentAgent.policy?.id || null,
      };

      if (isEmpty(currentAgent.id)) {
        dispatch(createAgent(agentData));
      } else {
        dispatch(updateAgent({ id: currentAgent.id, agentData }));
      }
    } else {
      dispatch(agentWizardNextStep());
    }
  };

  const renderNext = () => {
    const visibility = navigation.next.visible ? 'visible' : 'hidden';
    const enabled = navigation.next.enabled;

    return (
      <Box sx={{ visibility }}>
        <Button
          disabled={!enabled}
          variant="contained"
          onClick={() => nextAction()}
        >
          {getNextText()}
        </Button>
      </Box>
    );
  };

  return (
    <Box className="wizardnavigation">
      {renderBack()}
      {renderNext()}
    </Box>
  );
};

export default AgentWizardNavigation;