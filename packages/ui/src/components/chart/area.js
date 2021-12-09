import React from "react";
import { area, curveMonotoneX } from "d3-shape";

export default function Area({
  data,
  xAccessor,
  y0Accessor,
  y1Accessor,
  ...props
}) {
  let areaObj = area()
    .x(xAccessor)
    .y0(y0Accessor)
    .y1(y1Accessor)
    .curve(curveMonotoneX);
  let d = areaObj(data);
  return <path d={d} {...props} />;
}
