import React, { useMemo, useRef, useEffect, useState } from "react";
import CutPath from "./cut-path";
import calcBarWidths from "./calculate-widths";

export default function Schematic({
  polyline,
  maxBarWidth,
  barLength,
  connectorWidth,
  materialThickness,
  setValidCurve,
  ...props
}) {
  const svgRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState("3em");
  const widths = useMemo(() => {
    let w = calcBarWidths(maxBarWidth, materialThickness, polyline);
    if (w) {
      return [maxBarWidth / 2, ...w, maxBarWidth / 2];
    } else {
      return null;
    }
  }, [maxBarWidth, materialThickness, polyline]);

  let cutPathProps;
  let barCenterCenter;
  let tfm = "";
  let scale;
  if (widths) {
    barCenterCenter = Math.max(...widths) * 1.1;
    cutPathProps = {
      barWidths: widths,
      barLength,
      barCenterCenter,
      connectorWidth,
      vectorEffect: "non-scaling-stroke",
    };
    let n = widths.length;
    let xMin = -widths[0] / 2;
    let xMax = n * barCenterCenter + widths[n - 1] / 2;
    scale = 100 / (xMax + xMin);
    tfm = `scale(${scale}) translate(${-2 * xMin} 0)`;
  }

  useEffect(() => {
    setValidCurve(widths !== null);
    if (widths === null) {
      return "3em";
    }
    let rect = svgRef.current.getBoundingClientRect();
    let svgWidth = rect.right - rect.left;
    let contentWidth = 100 / scale;
    let contentHeight = 2 * (2 * connectorWidth + barLength);
    let svgHeight = (svgWidth * contentHeight) / contentWidth;
    setSvgHeight(`${svgHeight}px`);
  }, [polyline]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 -50 100 100"
      width="100%"
      height={`calc(${svgHeight} + 2em)`}
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="black" strokeWidth={1} fill="none" transform={tfm}>
        {widths ? (
          <CutPath {...cutPathProps} />
        ) : (
          <text
            text-anchor="middle"
            stroke="none"
            fill="black"
            x="50%"
            y="0.4em"
          >
            No solution
          </text>
        )}
      </g>
    </svg>
  );
}
