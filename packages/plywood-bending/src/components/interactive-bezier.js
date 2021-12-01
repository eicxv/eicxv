import React, { useRef } from 'react';
import DraggableCircle from './draggable-handles';

export default function InteractiveCurve({
  bezier,
  setBezier,
  children,
  ...props
}) {
  const handle = {
    r: 1.5,
    hoverScale: 1.5,
  };
  const svgRef = useRef(null);

  const calcScale = () => {
    if (!svgRef.current) {
      return 1;
    }
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const len = Math.min(width, height);
    return 100 / len;
  };

  const dragProps = {
    threshold: 0,
  };

  const bounds = [
    0 + handle.r * handle.hoverScale,
    100 - handle.r * handle.hoverScale,
  ];

  let d = `M ${bezier[0].join(' ')} C ${bezier[1].join(' ')}, ${bezier[2].join(
    ' '
  )}, ${bezier[3].join(' ')}`;
  return (
    <svg
      viewBox="0 0 100 100"
      transform={``}
      preserveAspectRatio="xMidYMid meet"
      ref={svgRef}
    >
      <g stroke="black" fill="none">
        <path d={d} strokeWidth={0.25}></path>
        <line
          x1={bezier[0][0]}
          y1={bezier[0][1]}
          x2={bezier[1][0]}
          y2={bezier[1][1]}
          strokeWidth={0.1}
        />
        <line
          x1={bezier[3][0]}
          y1={bezier[3][1]}
          x2={bezier[2][0]}
          y2={bezier[2][1]}
          strokeWidth={0.1}
        />
      </g>
      {children}
      <g stroke="none" fill="black">
        {[true, false, false, true].map((xAxis, i) => (
          <DraggableCircle
            getScale={calcScale}
            index={i}
            key={i}
            {...handle}
            bezier={bezier}
            setBezier={setBezier}
            bounds={{ x: bounds, y: bounds }}
            xAxis={xAxis}
            dragProps={dragProps}
          />
        ))}
      </g>
    </svg>
  );
}
