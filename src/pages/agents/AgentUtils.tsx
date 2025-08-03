import { Policy } from 'pages/policies/PolicyUtils';

export type Agent = {
  id: string;
  description: string;
  configuration: object;
  createdAt: string;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
  };
  policy: Policy | null;
};

export type AgentKey = keyof Agent;

export type AgentKeyToEdit = 'description' | 'configuration' | 'policy';

//Agent Example from API
/*{
  "id": "824b4816-0219-4da0-89f2-05005278008f",
  "description": "Default agent for organization",
  "configuration": null,
  "createdAt": "2025-07-30T18:06:18.472Z",
  "updatedAt": "2025-07-30T18:06:18.472Z",
  "organization": {
    "id": "cf0dd276-e87c-4344-bfbd-5a000876a40b",
    "name": "My Company"
  },
  "policy": {
    "id": "281c8896-3a8d-4ca6-93d7-69d212faf81c",
    "name": "Default Policy",
    "policy": {
      "rules": [],
      "description": "Default security policy for organization",
      "permissions": ["read", "write"]
    }
  }
}*/