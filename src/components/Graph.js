import React, { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, ReactFlowProvider } from 'reactflow';
import { useSelector, useDispatch } from "react-redux";
import { setGraph,  setSelectedNode } from "../graphSlice";
import "reactflow/dist/style.css";


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

    
    // Creating a new array for re-render the graph to make the change in UI and 
    // add style like bg-color & fontsize

    useEffect(() => {
        // console.log(graph);
        
        setNodes(graph.nodes.map(node => ({
            ...node,
            style: {
                backgroundColor: node.data.color,
                fontSize: `${node.data.fontSize}px`
            }
        })));
        // console.log(nodes);
        
    }, [graph.nodes]);
    
    // useEffect(() => {
    //     console.log("Updated Nodes in Graph Component:", nodes);
    // }, [nodes]);
    
    
    const onNodeClick = (event, node) => {
        dispatch(setSelectedNode(node)); 
    };

     //Save node position when dragging stops
     const onNodeDragStop = (event, node) => {
        // console.log(node.position);
        
        const updatedNodes = nodes.map(n =>
            n.id === node.id ? { ...n, position: node.position } : n
        );
        dispatch(setGraph({ nodes: updatedNodes, edges })); // Save new positions
    };
    //Creating a new node to update the style in it to make change in ui

    // const updatedNodes = nodes.map(node => ({
    //     ...node, 
    //     style: { 
    //         ...node.style, 
    //         backgroundColor: node.data.color,
    //         fontSize: node.data.fontSize } 
    // }));
    

    return (
        <ReactFlowProvider>
            <div style={{ width: "100vw", height: "100vh" }}>
                <Background />
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStop={onNodeDragStop}
                    onNodeClick={onNodeClick}
                    // nodeTypes={nodeTypes}
                    fitView
                />
                <Controls />
            </div>
        </ReactFlowProvider>
    );
};

export default Graph;
