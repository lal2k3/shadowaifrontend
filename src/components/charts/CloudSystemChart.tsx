import React, { useEffect, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Node,
  Edge,
  Connection,
  OnConnect,
} from '@xyflow/react';
import DefaultContainer from './DefaultContainer';
import { CVE, cveMockData } from '../../mocks/cveMockData';

const nodeWidth = 300;
const nodeHeight = 200;

type CustomData = {
  service: string;
  cves: { id: string; severity: string }[];
};

const ServiceNode = ({ data }: { data: CustomData }) => {
  return (
    <div style={{ padding: 20, fontSize: 16 }}>
      <strong>{data.service}</strong>
      <ul>
        {data.cves.map((cve) => (
          <li key={cve.id}>
            {cve.id} ({cve.severity})
          </li>
        ))}
      </ul>
    </div>
  );
};

const nodeTypes = {
  serviceNode: ServiceNode,
};

const CloudSystemChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const services = new Map<string, Node>();

    cveMockData.forEach((cve: CVE, index) => {
      if (
        cve.reachability === 'Yes' &&
        (cve.severity === 'High' || cve.severity === 'Critical')
      ) {
        const existingNode = services.get(cve.service[0]);
        const cveInfo = { id: cve.id, severity: cve.severity };

        if (existingNode) {
          const cves: { id: string; severity: string }[] = existingNode.data
            .cves as { id: string; severity: string }[];
          cves.push(cveInfo);
        } else {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const serviceNode: Node = {
            id: cve.service[0],
            type: 'serviceNode',
            data: { service: cve.service, cves: [cveInfo] },
            position: { x: col * 350, y: row * 250 },
            style: {
              background: '#0052cc',
              color: '#FFFFFF',
              padding: 20,
              borderRadius: '10px',
              width: `${nodeWidth}px`,
              height: `${nodeHeight}px`,
              overflow: 'hidden',
            },
          };
          services.set(cve.service[0], serviceNode);
        }
      }
    });

    const nodesArray = Array.from(services.values());
    const edgesArray: Edge[] = [];

    // אין צורך להשתמש ב-dagre למיקום כי אנחנו עושים זאת ידנית
    setNodes(nodesArray);
    setEdges(edgesArray);
  }, []);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlowProvider>
      <DefaultContainer>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
        </ReactFlow>
      </DefaultContainer>
    </ReactFlowProvider>
  );
};

export default CloudSystemChart;
