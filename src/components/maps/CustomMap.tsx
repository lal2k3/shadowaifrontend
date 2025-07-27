import React, { useEffect, useRef, useState } from 'react';
import { CVE_MAPS } from 'mocks/maps/cveMap';
import {
  ReactFlow,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ImageNode from './customTypes/ImageNode';

const nodeTypes = {
  imageNode: ImageNode,
};

interface Props {
  mapId: string;
}

const CustomMap = ({ mapId }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    setIsDataLoaded(false);
    setNodes([]);
    setEdges([]);

    setTimeout(() => {
      const newNodes = CVE_MAPS[mapId].nodes;
      const newEdges = CVE_MAPS[mapId].edges;
      setNodes(newNodes);
      setEdges(newEdges);

      if (reactFlowInstance.current && reactFlowWrapper.current) {
        const { clientWidth, clientHeight } = reactFlowWrapper.current;
        const numNodes = newNodes.length;
        if (numNodes > 12) {
          const zoomLevel = Math.min(clientWidth / (12 * 100), clientHeight / (6 * 100));
          const xOffset = (clientWidth - (12 * 100 * zoomLevel)) / 2;
          const yOffset = (clientHeight - (6 * 100 * zoomLevel)) / 2;
          reactFlowInstance.current.setViewport({ x: xOffset, y: yOffset, zoom: zoomLevel });
        } else {
          reactFlowInstance.current.fitView({ padding: 0.1 });
        }
      }

      setIsDataLoaded(true); // Data loaded and zoom set
    }, 100);
  }, [mapId]);

  return (
    <ReactFlowProvider>
      {isDataLoaded && (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            onInit={(instance) => {
              reactFlowInstance.current = instance;
              if (reactFlowWrapper.current) {
                const { clientWidth, clientHeight } = reactFlowWrapper.current;
                const numNodes = nodes.length;
                if (numNodes > 12) {
                  const zoomLevel = Math.min(clientWidth / (12 * 100), clientHeight / (6 * 100));
                  const xOffset = (clientWidth - (12 * 100 * zoomLevel)) / 2;
                  const yOffset = (clientHeight - (6 * 100 * zoomLevel)) / 2;
                  instance.setViewport({ x: xOffset, y: yOffset, zoom: zoomLevel });
                } else {
                  instance.fitView({ padding: 0.1 });
                }
              }
            }}
          >
            <Background />
          </ReactFlow>
        </div>
      )}
    </ReactFlowProvider>
  );
};

export default CustomMap;
