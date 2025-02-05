import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNodeColor, updateFontSize, setSelectedNode ,undo, redo} from '../graphSlice';
import { SketchPicker } from 'react-color';
import "../App.css";

const NodeControls = () => {
    const dispatch = useDispatch();
    const selectedNode = useSelector((state) => state.graph.selectedNode);

    const [color, setColor] = useState('#FF0000');
    const [fontSize, setFontSize] = useState(14);

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        if (selectedNode) {
            dispatch(updateNodeColor({ id: selectedNode, color: newColor.hex }));
        }
    };



    const handleFontSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setFontSize(size);
        if (selectedNode) {
            // console.log(selectedNode,size);
            dispatch(updateFontSize({ id: selectedNode, fontSize: size }));
        }
    };

    return (
        <div className='nodecontrol'>
            <h3>Node Controls</h3>
            <div className="controls-container">
                <input
                    type="text"
                    placeholder="Enter Node ID"
                    value={selectedNode?.data?.label || "selectnode"}
                />
                <SketchPicker color={color} onChange={(e) => handleColorChange(e)} />
                <select value={fontSize} onChange={handleFontSizeChange}>
                    {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                        <option key={size} value={size}>
                            {size}px
                        </option>
                    ))}
                </select>
                <button onClick={() => dispatch(undo())}>Undo</button>
                <button onClick={() => dispatch(redo())}>Redo</button>

            </div>

        </div>
    );
};

export default NodeControls;
