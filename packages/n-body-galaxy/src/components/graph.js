import React, { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import { useChartDimensions, Line, GraphLabel, Axis } from '@eicxv/ui';

const chartSettings = {
  marginTop: 70,
  marginRight: 70,
  marginBottom: 70,
  marginLeft: 70,
};

export default function Chart({ energy, yDomain }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const length = energy.length;
  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain([-length + 1, 0])
        .range([0, dms.boundedWidth]),
    [dms.boundedWidth, length]
  );
  const yScale = useMemo(
    () => scaleLinear().domain(yDomain).range([dms.boundedHeight, 0]),
    [dms.boundedHeight]
  );
  const x = (d, i) => xScale(i - length + 1);
  const lines = [
    { y: (d) => yScale(d.kinetic), color: '#aa0000' },
    { y: (d) => yScale(d.potential), color: '#0000aa' },
    { y: (d) => yScale(d.total), color: '#aa00aa' },
  ];

  const defined = (d) => d != null;

  return (
    <div ref={ref}>
      <svg width={dms.width} height={400}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(',')})`}
        >
          {lines.map((line, i) => (
            <Line
              data={energy}
              xAccessor={x}
              yAccessor={line.y}
              defined={defined}
              fill={'none'}
              stroke={line.color}
              strokeWidth="2"
              key={i}
            />
          ))}
          <g transform={`translate(${[0, dms.boundedHeight].join(',')})`}>
            <Axis domain={xScale.domain()} range={xScale.range()} variant="x" />
            <Axis
              domain={yScale.domain()}
              range={[0, dms.boundedHeight]}
              variant="y"
            />
            <GraphLabel range={xScale.range()} variant="x">
              Time
            </GraphLabel>
            <GraphLabel range={yScale.range()} variant="y">
              Energy
            </GraphLabel>
          </g>
        </g>
      </svg>
    </div>
  );
}
