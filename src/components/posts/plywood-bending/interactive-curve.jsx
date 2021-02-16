import React, { useRef } from "react";
import DraggableCircle from "./draggable-circle";

function calcScale(svgRef) {
  const width = svgRef.current.clientWidth;
  const height = svgRef.current.clientHeight;
  const len = Math.min(width, height);
  return 100 / len;
}

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

  const dragTransform = (p) => {
    const viewScale = calcScale(svgRef);
    p[0] *= viewScale;
    p[1] *= viewScale;
    return p;
  };
  const dragProps = {
    transform: dragTransform,
    threshold: 0,
    bounds: {
      left: 0 + handle.r * handle.hoverScale,
      right: 100 - handle.r * handle.hoverScale,
      top: 0 + handle.r * handle.hoverScale,
      bottom: 100 - handle.r * handle.hoverScale,
    },
  };

  let d = `M ${bezier[0].join(" ")} C ${bezier[1].join(" ")}, ${bezier[2].join(
    " "
  )}, ${bezier[3].join(" ")}`;
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
            index={i}
            key={i}
            {...handle}
            bezier={bezier}
            setBezier={setBezier}
            xAxis={xAxis}
            dragProps={dragProps}
          />
        ))}
      </g>
    </svg>
  );
}
