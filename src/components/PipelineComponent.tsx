// src/components/PipelineComponent.tsx
import React, { useCallback } from 'react';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Connection, Edge } from '@xyflow/react';
import 'reactflow/dist/style.css';
import { Box } from '@mui/material';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'build-job1' }, style: { backgroundColor: '#4CAF50' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'build-job2' }, style: { backgroundColor: '#4CAF50' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'build-job3' }, style: { backgroundColor: '#4CAF50' } },
  { id: '4', position: { x: 200, y: 50 }, data: { label: 'test-job1' }, style: { backgroundColor: '#FFC107' } },
  { id: '5', position: { x: 200, y: 150 }, data: { label: 'test-job2' }, style: { backgroundColor: '#4CAF50' } },
  { id: '6', position: { x: 200, y: 250 }, data: { label: 'test-job3' }, style: { backgroundColor: '#4CAF50' } },
  { id: '7', position: { x: 400, y: 100 }, data: { label: 'deploy-job1' }, style: { backgroundColor: '#FFC107' } },
  { id: '8', position: { x: 400, y: 200 }, data: { label: 'deploy-job2' }, style: { backgroundColor: '#4CAF50' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e4-7', source: '4', target: '7' },
  { id: 'e5-8', source: '5', target: '8' },
  { id: 'e6-8', source: '6', target: '8' },
];

const PipelineComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <Box sx={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Box>
  );
};

export default PipelineComponent;
