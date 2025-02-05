import { createSlice } from '@reduxjs/toolkit';

const initialNodes = Array.from({ length: 10 }, (_, i) => ({
    id: `${i}`,
    position: { x: Math.random() * 200, y: Math.random() * 200 },
    data: { label: `Node ${i}`, color: ' #909090', fontSize: 14 },
    draggable: true,
}));

const initialEdges = initialNodes.slice(1).map((_, i) => ({
    id: `${i}`,
    source: `${i}`,
    target: `${i + 1}`,
}));

const initialState = {
    nodes: initialNodes,
    edges: initialEdges,
    history: { past: [], present: { nodes: initialNodes, edges: initialEdges }, future: [] },
};

const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        updateNodeColor: (state, action) => {
            const { id, color } = action.payload;

            // Save current state for undo        

            state.history.past.push(state.history.present);           
            state.history.future = []; // Clear redo history

            const updatededNode = state.history.present.nodes.map(node =>
                node.id === id.id ? { ...node, data: { ...node.data, color } } : node
            );

            // Update present history with the full updated nodes array
            state.history.present = {
                nodes: updatededNode,
                edges: state.history.present.edges
            };
            // console.log("After update",state.history.present);

        },

        updateFontSize: (state, action) => {
            const { id, fontSize } = action.payload;

            // Save current state for undo

            state.history.past.push(state.history.present);           
            state.future = [];

            const updatededNode = state.history.present.nodes.map((node) =>
                node.id === id.id ? { ...node, data: { ...node.data, fontSize: fontSize } } : node
            );

            // Update present history with the full updated nodes array
            state.history.present = {
                nodes: updatededNode,
                edges: state.history.present.edges
            };
            // console.log("After update", state.history.present);

        },
        setGraph(state, action) {
            state.history.past.push(state.history.present);           
            state.history.present = {
                nodes: action.payload.nodes,
                edges: action.payload.edges
            };      
            // console.log(JSON.stringify(state.history));      
            state.history.future = [];
        },
        setSelectedNode: (state, action) => {
            state.selectedNode = action.payload;
        },
        undo: (state) => {
            if (state.history.past.length > 0) {
                console.log("insideif");
                
                state.history.future.unshift(state.history.present);
                state.history.present = state.history.past.pop();
            }
        },
        redo: (state) => {
            if (state.history.future.length > 0) {
                state.history.past.push(state.history.present);
                state.history.present = state.history.future.shift();
            }
        },
        // initializeGraph: (state) => {
        //     state.history.present = { nodes: initialNodes, edges: [] };
        //     state.history.past = [];
        //     state.history.future = [];
        // },
    },
});

export const { updateNodeColor, updateFontSize, setGraph, undo, redo, initializeGraph, setSelectedNode } = graphSlice.actions;
export default graphSlice.reducer;
