import React from 'react';
import Bezier from '../calculation/bezier';
import { useDebouncedEffect } from '../utility/use-debounced-effect';

export default function FittedPolyline({
  bezierPoints,
  segments,
  polyline,
  setPolyline,
  valid,
  ...props
}) {
  const f = () => {
    let b = new Bezier(bezierPoints);
    setPolyline(b.polylineEqualSegments(segments, 0.001));
  };
  const color = valid ? '#212121' : '#bb2121';
  useDebouncedEffect(f, 100, [bezierPoints, segments]);

  return (
    <polyline
      points={polyline.join(' ')}
      fill="none"
      stroke={color}
      strokeWidth="0.5"
    />
  );
}
