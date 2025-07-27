import { Policy } from 'pages/policies/PolicyUtils';

export const MOCK_POLICIES: Policy[] = [
  {
    id: '1',
    name: 'Default confidence score',
    trigger: 'On Critical CVE found',
    time: '2AM',
    recurrence: 'Every 24 hours',
    appliesTo: 'test-repo',
    rules: [],
  },
];
