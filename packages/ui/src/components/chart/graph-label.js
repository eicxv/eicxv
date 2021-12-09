import React, { useMemo } from "react";
import { scaleLinear } from "d3-scale";

export default function GraphLabel({
  range = [0, 100],
  variant = "x",
  children,
  transform,
  style,
  ...other
}) {
  const x = (range[0] + range[1]) / 2;
  const y = variant === "x" ? 48 : -48;
  const rot = variant === "x" ? 0 : -90;
  transform = transform || "";
  return (
    <text
      transform={`rotate(${rot}) translate(${x} ${y}) ${transform}`}
      style={{
        fontSize: "18px",
        textAnchor: "middle",
        ...style,
      }}
      {...other}
    >
      {children}
    </text>
  );
}
