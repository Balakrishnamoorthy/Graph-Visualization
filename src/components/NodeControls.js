import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNodeColor, updateFontSize, setSelectedNode } from '../graphSlice';
import { SketchPicker } from 'react-color';

const NodeControls = () => {
    const dispatch = useDispatch();
    const selectedNode = useSelector((state) => state.graph.selectedNode);
    console.log(selectedNode);

    const [color, setColor] = useState('#FF0000');
    const [fontSize, setFontSize] = useState(14);

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        if (selectedNode) {
            dispatch(updateNodeColor({ id: selectedNode, color: newColor.hex }));
        }
    };
    console.log(color);


    const handleFontSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setFontSize(size);
        if (selectedNode) {
            dispatch(updateFontSize({ id: selectedNode, fontSize: size }));
        }
    };

    return (
        <div>
            <h3>Node Controls</h3>
            <input
                type="text"
                placeholder="Enter Node ID"
                onChange={(e) => setSelectedNode(e.target.value)}
            />
            <SketchPicker color={color} onChange={(e) => handleColorChange(e)} />
            <select value={fontSize} onChange={handleFontSizeChange}>
                {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                    <option key={size} value={size}>
                        {size}px
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NodeControls;
