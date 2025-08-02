export type Policy = {
  id: string;
  name: string;
  policy: unknown;
  ownerId: string;
  organizationId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    username: string;
    email: string;
  };
};

export type PolicyKey = keyof Policy;

//Policy Example
/*{
  "id": "281c8896-3a8d-4ca6-93d7-69d212faf81c",
  "name": "Default Policy",
  "policy": {
      //any json
  },
  "ownerId": "8e2cd66f-4314-40a7-a954-941ef171dd7a",
  "organizationId": "cf0dd276-e87c-4344-bfbd-5a000876a40b",
  "isActive": true,
  "createdAt": "2025-07-30T18:06:18.463Z",
  "updatedAt": "2025-07-30T18:06:18.463Z",
  "owner": {
      "id": "8e2cd66f-4314-40a7-a954-941ef171dd7a",
      "username": "admin",
      "email": "admin@example.com"
  }
}*/