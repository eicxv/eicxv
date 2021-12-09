import React from 'react';
import { line, curveMonotoneX } from 'd3-shape';

export default function Line({
  data,
  xAccessor,
  yAccessor,
  defined,
  ...props
}) {
  let lineObj = line().x(xAccessor).y(yAccessor).curve(curveMonotoneX);
  if (defined) {
    lineObj.defined(defined);
  }
  let d = lineObj(data);
  return <path d={d} {...props} />;
}
