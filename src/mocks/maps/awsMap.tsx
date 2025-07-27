import { defaultNodeStyle } from './defaults';
import { Position, Node, Edge } from '@xyflow/react';
import serviceLogo from 'assets/logos/service.png';

import { cveMockData } from 'mocks/cveMockData';

interface Cves {
  critical: number;
  high: number;
}

interface CVE {
  id: string;
  service: string[];
  package: string;
  version: string;
  remediation_version: string;
  severity: string;
  cvss: number;
  reachability: string;
  endpoints: string[];
  userJourneys: { user: string; journey: string; payload: string }[];
}

const determineColor = (cves: Cves): string => (cves.critical > 0 ? 'red' : 'orange');

const serviceCveMap = new Map<string, Cves>();

cveMockData.forEach((cve: CVE) => {
  cve.service.forEach((service: string) => {
    if (!serviceCveMap.has(service)) {
      serviceCveMap.set(service, { critical: 0, high: 0 });
    }
    const currentCves = serviceCveMap.get(service);
    if (currentCves) {
      if (cve.severity === 'Critical') {
        currentCves.critical += 1;
      } else if (cve.severity === 'High') {
        currentCves.high += 1;
      }
    }
  });
});

export const CVE_AWS_MAP: { nodes: Node<Record<string, unknown>, string>[]; edges: Edge[] } = {
  nodes: Array.from(serviceCveMap.entries()).map(([service, cves], index) => ({
    id: `service${index + 1}`,
    type: 'imageNode',
    data: {
      label: service,
      image: serviceLogo,
      color: determineColor(cves),
      cves,
    },
    position: { x: (index % 4) * 300, y: Math.floor(index / 4) * 200 },
    style: { ...defaultNodeStyle },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  })),
  edges: [],
};
