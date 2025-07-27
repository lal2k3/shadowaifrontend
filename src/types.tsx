// src/types.ts
export interface Test {
    type: string;
    description: string;
    endpoint: string;
    method: string;
    headers: { key: string; value: string }[];
    params: { key: string; value: string }[];
    body: string;
    expectedResult: string;
    apiVersion: string;
  }
  