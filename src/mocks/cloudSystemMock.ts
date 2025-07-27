import { Node, Edge } from '@xyflow/react';

interface Vulnerability {
  id: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface Service {
  name: string;
  type: string;
  vulnerabilities: Vulnerability[];
  dbType?: string;
  mqType?: string;
}

interface SystemNode {
  name: string;
  services: Service[];
}

interface Cluster {
  name: string;
  nodes: SystemNode[];
}

interface MockData {
  company: string;
  environment: string;
  clusters: Cluster[];
}

const mockData: MockData = {
  company: 'CloudCorp',
  environment: 'Production',
  clusters: [
    {
      name: 'Cluster A',
      nodes: [
        {
          name: 'Node 1',
          services: [
            {
              name: 'Web Service',
              type: 'web',
              vulnerabilities: [
                {
                  id: 'CVE-2022-12345',
                  description: 'Remote code execution vulnerability in Web Service',
                  severity: 'Critical',
                },
              ],
            },
            {
              name: 'Auth Service',
              type: 'auth',
              vulnerabilities: [
                {
                  id: 'CVE-2022-23456',
                  description: 'Authentication bypass vulnerability',
                  severity: 'High',
                },
              ],
            },
          ],
        },
        {
          name: 'Node 2',
          services: [
            {
              name: 'Database Service',
              type: 'database',
              dbType: 'PostgreSQL',
              vulnerabilities: [
                {
                  id: 'CVE-2022-34567',
                  description: 'SQL injection vulnerability in PostgreSQL',
                  severity: 'Critical',
                },
              ],
            },
            {
              name: 'Cache Service',
              type: 'cache',
              dbType: 'Redis',
              vulnerabilities: [
                {
                  id: 'CVE-2022-45678',
                  description: 'Denial of service vulnerability in Redis',
                  severity: 'High',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Cluster B',
      nodes: [
        {
          name: 'Node 3',
          services: [
            {
              name: 'Message Queue Service',
              type: 'message-queue',
              mqType: 'RabbitMQ',
              vulnerabilities: [
                {
                  id: 'CVE-2022-56789',
                  description: 'Privilege escalation vulnerability in RabbitMQ',
                  severity: 'Medium',
                },
              ],
            },
            {
              name: 'Analytics Service',
              type: 'analytics',
              vulnerabilities: [
                {
                  id: 'CVE-2022-67890',
                  description: 'Cross-site scripting vulnerability in Analytics Service',
                  severity: 'Medium',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Cluster C',
      nodes: [
        {
          name: 'Node 4',
          services: [
            {
              name: 'File Storage Service',
              type: 'file-storage',
              vulnerabilities: [
                {
                  id: 'CVE-2022-78901',
                  description: 'Unauthorized file access vulnerability in File Storage Service',
                  severity: 'High',
                },
              ],
            },
            {
              name: 'Backup Service',
              type: 'backup',
              vulnerabilities: [
                {
                  id: 'CVE-2022-89012',
                  description: 'Data corruption vulnerability in Backup Service',
                  severity: 'Critical',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const generateNodesAndEdges = (mockData: MockData) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  mockData.clusters.forEach((cluster, clusterIndex) => {
    cluster.nodes.forEach((node, nodeIndex) => {
      node.services.forEach((service, serviceIndex) => {
        const nodeId = `node-${clusterIndex}-${nodeIndex}-${serviceIndex}`;
        nodes.push({
          id: nodeId,
          type: 'default',
          data: { label: `${service.name} (${node.name})` },
          position: { x: Math.random() * 800, y: Math.random() * 600 },
        });

        // Add edges between services of the same node
        if (serviceIndex > 0) {
          const prevNodeId = `node-${clusterIndex}-${nodeIndex}-${serviceIndex - 1}`;
          edges.push({
            id: `edge-${prevNodeId}-${nodeId}`,
            source: prevNodeId,
            target: nodeId,
          });
        }
      });
    });
  });

  return { nodes, edges };
};

const { nodes, edges } = generateNodesAndEdges(mockData);
export { nodes, edges };
export default mockData;
