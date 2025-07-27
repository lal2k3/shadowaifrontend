import { Box } from '@mui/material';
import { ReactNode } from 'react';
import PolicyItem from './PolicyItem';
import { MOCK_POLICIES } from 'mocks/policiesMockData';
import NewPolicyItem from './NewPolicyItem';

const PoliciesPanel = () => {
  const data = MOCK_POLICIES;

  const renderPolicieis = () => {
    const policieisElements: ReactNode[] = [];

    data.forEach((policy) => {
      policieisElements.push(
        <PolicyItem data={policy} key={`policy-${policy.id}`} />,
      );
    });

    return policieisElements;
  };

  return (
    <Box className="integrationspanel">
      <NewPolicyItem />
      {renderPolicieis()}
    </Box>
  );
};

export default PoliciesPanel;
