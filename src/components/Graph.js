import React, { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, ReactFlowProvider } from 'reactflow';
import { useSelector, useDispatch } from "react-redux";
import { setGraph, undo, redo, initializeGraph, setSelectedNode } from "../graphSlice";
import "reactflow/dist/style.css";

// const Graph = () => {
//     const { nodes, edges } = useSelector((state) => state.graph);




//     return (
//         <div style={{ width: '100vw', height: '80vh' }}>
//             <ReactFlow nodes={nodes} edges={edges} fitView >
//                 <Background />
//                 <Controls />
//             </ReactFlow>
//         </div>
//     );
// };

// export default Graph;

const Graph = () => {
    const dispatch = useDispatch();
    const graph = useSelector((state) => state.graph.history.present) || { nodes: [], edges: [] };
    const selectedNode = useSelector((state) => state.graph.selectedNode); // To access the selected node

    const defaultNodes = [
        { id: "1", position: { x: 150, y: 150 }, data: { label: "Start Node" }, animated: true },
    ];

    const initialNodes = graph.nodes && graph.nodes.length > 0 ? graph.nodes : defaultNodes;
    const initialEdges = graph.edges || [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // useEffect(() => {
    //     if (graph && graph.nodes && graph.nodes.length === 0) {
    //         dispatch(initializeGraph());
    //     }
    // }, [dispatch, graph]);
    const onNodeClick = (event, node) => {
        dispatch(setSelectedNode(node)); // Dispatch selected node to Redux
    };

    const onNodeDragStop = (_, node) => {
        const updatedNodes = nodes.map((n) => (n.id === node.id ? node : n));
        dispatch(setGraph({ nodes: updatedNodes, edges }));
    };

    return (
        <ReactFlowProvider>
            <div style={{ width: "100vw", height: "100vh" }}>
                <button onClick={() => dispatch(undo())}>Undo</button>
                <button onClick={() => dispatch(redo())}>Redo</button>
                <Background />
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={onNodeDragStop}
                    onNodeClick={onNodeClick}
                    fitView
                />
                <Controls />
            </div>
        </ReactFlowProvider>
    );
};

export default Graph;
