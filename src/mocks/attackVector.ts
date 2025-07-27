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

interface Node {
  name: string;
  services: Service[];
}

interface Cluster {
  name: string;
  nodes: Node[];
}

interface AttackVector {
  name: string;
  path: string[];
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
}

interface MockData {
  company: string;
  environment: string;
  clusters: Cluster[];
  attackVectors: AttackVector[];
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
  attackVectors: [
    {
      name: 'Attack Vector 1',
      path: ['Cluster A', 'Node 1', 'Web Service', 'Cluster A', 'Node 1', 'Auth Service'],
      impact: 'Critical',
      description: 'Attack vector through Web Service to Auth Service in Cluster A',
    },
    {
      name: 'Attack Vector 2',
      path: ['Cluster A', 'Node 2', 'Database Service', 'Cluster A', 'Node 2', 'Cache Service'],
      impact: 'High',
      description: 'Attack vector through Database Service to Cache Service in Cluster A',
    },
    {
      name: 'Attack Vector 3',
      path: ['Cluster B', 'Node 3', 'Message Queue Service', 'Cluster B', 'Node 3', 'Analytics Service'],
      impact: 'Medium',
      description: 'Attack vector through Message Queue Service to Analytics Service in Cluster B',
    },
    {
      name: 'Attack Vector 4',
      path: ['Cluster C', 'Node 4', 'File Storage Service', 'Cluster C', 'Node 4', 'Backup Service'],
      impact: 'Critical',
      description: 'Attack vector through File Storage Service to Backup Service in Cluster C',
    },
    {
      name: 'Complex Attack Vector',
      path: ['Cluster A', 'Node 1', 'Web Service', 'Cluster B', 'Node 3', 'Message Queue Service', 'Cluster C', 'Node 4', 'Backup Service'],
      impact: 'High',
      description: 'Complex attack vector through multiple clusters and nodes',
    },
  ],
};

export default mockData;
