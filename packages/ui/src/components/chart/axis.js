import React, { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';

const path = {
  x: (range) => ['M', range[1], 6, 'v', -6, 'H', range[0], 'v', 6].join(' '),
  y: (range) => ['M', -6, range[0], 'h', 6, 'V', -range[1], 'h', -6].join(' '),
};

const createTicks = {
  x: ({ value, offset }) => (
    <g key={value} transform={`translate(${offset}, 0)`}>
      <line y2="6" stroke="currentColor" />
      <text
        key={value}
        textAnchor="middle"
        style={{
          transform: `translateY(20px)`,
        }}
      >
        {value}
      </text>
    </g>
  ),
  y: ({ value, offset }) => (
    <g key={value} transform={`translate(0, ${-offset})`}>
      <line x2="-6" stroke="currentColor" />
      <text
        key={value}
        textAnchor="end"
        dy="0.35em"
        style={{
          transform: 'translateX(-10px)',
        }}
      >
        {value}
      </text>
    </g>
  ),
};

export default function Axis({
  domain = [0, 100],
  range = [0, 100],
  pixelsPerTick = 40,
  variant = 'x',
}) {
  const ticks = useMemo(() => {
    const xScale = scaleLinear().domain(domain).range(range);
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      offset: xScale(value),
    }));
  }, [domain.join('-'), range.join('-'), pixelsPerTick]);

  return (
    <>
      <path d={path[variant](range)} fill="none" stroke="currentColor" />
      {ticks.map(createTicks[variant])}
    </>
  );
}
