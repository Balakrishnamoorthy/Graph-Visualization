import { createSlice } from '@reduxjs/toolkit';

const initialNodes = Array.from({ length: 10 }, (_, i) => ({
    id: `${i}`,
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    data: { label: `Node ${i}`, color: '#FF0000', fontSize: 14 },
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
            state.nodes = state.nodes.map((node) =>
                node.id === action.payload.id
                    ? { ...node, data: { ...node.data, color: action.payload.color } }
                    : node
            );
        },
        updateFontSize: (state, action) => {
            state.nodes = state.nodes.map((node) =>
                node.id === action.payload.id
                    ? { ...node, data: { ...node.data, fontSize: action.payload.fontSize } }
                    : node
            );
        },
        setGraph(state, action) {
            state.history.past.push(state.history.present);
            state.history.present = action.payload;
            state.history.future = [];
        },
        setSelectedNode: (state, action) => {
            state.selectedNode = action.payload; // Store the selected node in state
        },
        undo: (state) => {
            if (state.history.past.length > 0) {
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
