import { Area, Axis, GraphLabel, Line, useChartDimensions } from '@eicxv/ui';
import { scaleLinear } from 'd3-scale';
import React, { useMemo } from 'react';

const chartSettings = {
  marginTop: 70,
  marginRight: 70,
  marginBottom: 70,
  marginLeft: 70,
};

export default function AreaChart({
  spd,
  spdSpan,
  spdInterval,
  xLabel,
  yLabel,
}) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const xScale = useMemo(
    () => scaleLinear().domain(spdSpan).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  );
  const yScale = useMemo(
    () => scaleLinear().domain([0, 120]).range([dms.boundedHeight, 0]),
    [dms.boundedHeight]
  );
  const x = (d, i) => xScale(i * spdInterval + spdSpan[0]);
  const y = (d) => yScale(d);
  return (
    <div ref={ref}>
      <svg width={dms.width} height={400}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(',')})`}
        >
          <Area
            data={spd}
            xAccessor={x}
            y0Accessor={yScale(0)}
            y1Accessor={y}
            fill={'#000000'}
            fillOpacity={0.2}
          />
          <Line
            data={spd}
            xAccessor={x}
            yAccessor={y}
            fill={'none'}
            stroke="#000000"
            strokeWidth="2"
          />
          <g transform={`translate(${[0, dms.boundedHeight].join(',')})`}>
            <Axis domain={xScale.domain()} range={xScale.range()} variant="x" />
            <Axis
              domain={yScale.domain()}
              range={[0, dms.boundedHeight]}
              variant="y"
            />
            <GraphLabel range={xScale.range()} variant="x">
              Wavelength (nm)
            </GraphLabel>
            <GraphLabel range={yScale.range()} variant="y">
              Power
            </GraphLabel>
          </g>
        </g>
      </svg>
    </div>
  );
}
