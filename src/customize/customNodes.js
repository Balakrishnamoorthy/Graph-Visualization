import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div style={{
      padding: 10,
      borderRadius: 10,
      background: data.color || '#4CAF50',
      color: '#fff',
      textAlign: 'center',
      border: '2px solid #333'
    }}>
      <strong>{data.label}</strong>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CustomNode;
