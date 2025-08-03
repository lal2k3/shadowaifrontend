import { Box, CircularProgress, Alert } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PolicyItem from './PolicyItem';
import NewPolicyItem from './NewPolicyItem';
import { fetchPolicies } from 'store/reducers/policies';
import { IRootState } from 'store/reducers';
import { AppDispatch } from 'store';

const PoliciesPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { policies, loading, error, reload } = useSelector((state: IRootState) => state.policies);
  const token = useSelector((state: IRootState) => state.auth.token);

  useEffect(() => {
    if (reload) {
      dispatch(fetchPolicies());
    }
  }, [dispatch, token, reload]);

  const renderPolicies = () => {
    const policyElements: ReactNode[] = [];

    policies?.forEach((policy) => {
      policyElements.push(
        <PolicyItem data={policy} key={`policy-${policy.id}`} />,
      );
    });

    return policyElements;
  };

  if (loading) {
    return (
      <Box className="integrationspanel" display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="integrationspanel">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="integrationspanel">
      <NewPolicyItem />
      {renderPolicies()}
    </Box>
  );
};

export default PoliciesPanel;
