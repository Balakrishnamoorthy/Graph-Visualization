import React, { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, ReactFlowProvider } from 'reactflow';
import { useSelector, useDispatch } from "react-redux";
import { setGraph, setSelectedNode } from "../graphSlice";
import CustomNode from '../customize/customNodes';
import CustomEdge from '../customize/cutomEdge';
import "reactflow/dist/style.css";

const nodeTypes = { custom: CustomNode }
const edgeTypes = { custom: CustomEdge }

const Graph = () => {
    const dispatch = useDispatch();
    const graph = useSelector((state) => state.graph.history.present) || { nodes: [], edges: [] };



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

        setNodes(graph.nodes.map(node => ({
            ...node,
            style: {
                backgroundColor: node.data.color,
                fontSize: `${node.data.fontSize}px`
            }
        })));

    }, [graph.nodes]);



    const onNodeClick = (event,node) => {
        dispatch(setSelectedNode(node));
    };

    //Save node position when dragging stops
    const onNodeDragStop = (event,node) => {
        //log for checking the updated node position 
        // console.log(node.position);

        const updatedNodes = nodes.map(n =>
            n.id === node.id ? { ...n, position: node.position } : n
        );
        dispatch(setGraph({ nodes: updatedNodes, edges })); // Save new positions
    };


    return (
        <ReactFlowProvider>
            <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
                <Background />
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    // onNodesChange={onNodesChange}
                    // onEdgesChange={onEdgesChange}
                    onNodeDragStop={onNodeDragStop}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                />
                <Controls />
            </div>
        </ReactFlowProvider>
    );
};

export default Graph;
