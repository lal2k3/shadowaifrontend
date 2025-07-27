import { defaultNodeStyle } from './defaults';
import { Position } from '@xyflow/react';
import GithubLogo from 'assets/logos/GithubLogo.webp';
import AwsLogo from 'assets/logos/AwsLogo.webp';
import { CveMap } from './cveMap';

export const CVE_DEFAULT_MAP: CveMap = {
  nodes: [
    {
      id: 'github',
      type: 'imageNode',
      data: {
        label: 'GitHub',
        image: GithubLogo,
        color: 'orange',
        mapId: 'github',
        cves: { critical: 3, high: 2 },
      },
      position: { x: 150, y: 0 },
      style: {
        ...defaultNodeStyle,
      },
      sourcePosition: Position.Right,
    },
    {
      id: 'aws',
      type: 'imageNode',
      data: {
        label: 'AWS',
        image: AwsLogo,
        color: 'red',
        mapId: 'aws',
        cves: { critical: 3, high: 2 },
      },
      position: { x: 450, y: 0 },
      style: {
        ...defaultNodeStyle
      },
      targetPosition: Position.Left,
    },
  ],
  edges: [
    {
      id: 'e-github-aws',
      source: 'aws',
      target: 'github',
      type: 'smoothstep',
    },
  ],
};
