import React, { useRef, useEffect } from 'react';
import { ReactFlow, Background, Controls, ReactFlowProvider, Node, Edge, ReactFlowInstance } from '@xyflow/react';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface UserJourneyMapProps {
    journey: string;
    user: string;
    payload: string;
    service: string;
}

const UserJourneyMap: React.FC<UserJourneyMapProps> = ({ journey, user, service }) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const nodeIds = new Set<string>();

    const userNode = {
        id: `${user}`,
        data: { label: `${user}` },
        position: { x: 0, y: 0 },
        style: { background: '#000000', color: '#FFFFFF', padding: 10, borderRadius: '0' },
    };
    nodes.push(userNode);
    nodeIds.add(userNode.id);

    const steps = journey.split(' -> ');
    steps.forEach((step, j) => {
        const endpointNode = {
            id: `${step}_${user}`,
            data: { label: `${step} (${service})` },
            position: { x: (j + 1) * 200, y: 0 }, // כל הריבועים בשורה אחת אופקית
            style: { background: '#00ccff', padding: 10, borderRadius: '0' },
        };
        nodes.push(endpointNode);
        nodeIds.add(endpointNode.id);

        if (j === 0) {
            edges.push({ id: `e${userNode.id}-${endpointNode.id}`, source: userNode.id, target: endpointNode.id, type: 'smoothstep', animated: true });
        } else {
            edges.push({ id: `e${steps[j - 1]}_${user}-${endpointNode.id}`, source: `${steps[j - 1]}_${user}`, target: endpointNode.id, type: 'smoothstep', animated: true });
        }
    });

    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    useEffect(() => {
        if (reactFlowInstance.current) {
            reactFlowInstance.current.fitView({ padding: 0.1 });
        }
    }, [nodes, edges]);

    return (
        <ReactFlowProvider>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h4"></Typography>
                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: 'green' }}>User Journey - {userNode.id}</Typography>
                        <div style={{ height: 300 }}>
                            <ReactFlow 
                                nodes={nodes} 
                                edges={edges}
                                onInit={(instance) => {
                                    reactFlowInstance.current = instance;
                                    instance.fitView({ padding: 0.1 });
                                }}
                                zoomOnScroll={false} // Disable zoom on scroll
                                zoomOnPinch={false} // Disable zoom on pinch
                                panOnScroll={false} // Disable panning on scroll
                                panOnDrag={false} // Disable panning on drag
                                >
                                <Background color="#888" gap={16} />
                                <Controls showZoom={false} showFitView={false} /> {/* Hide zoom controls */}
                            </ReactFlow>
                        </div>
                    </CardContent>
                </Card>
            </Box>
        </ReactFlowProvider>
    );
};

export default UserJourneyMap;