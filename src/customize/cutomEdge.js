import React from 'react';
import { BaseEdge, getBezierPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <BaseEdge
      path={edgePath}
      style={{
        stroke: '#FF5733',
        strokeWidth: 3,
        strokeDasharray: '5,5', 
        animation: 'dash 1s linear infinite' 
      }}
    />
  );
};

export default CustomEdge;
