import { Edge, Node } from '@xyflow/react';
import { CVE_DEFAULT_MAP } from './defaultMap';
import { CVE_AWS_MAP } from './awsMap';

export type CveMaps = {
  [key: string]: CveMap
};

export type CveMap = {
  nodes: Node[];
  edges: Edge[];
}

export const CVE_MAPS: CveMaps = {
  default: CVE_DEFAULT_MAP,
  aws: CVE_AWS_MAP
};
