import React, { useEffect, useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import useChartDimensions from '../use-chart-dimensions';
import Axis from '../use-chart-dimensions/axis/axis';
import Line from '../line/line';
import Area from '../area';

const chartSettings = {
  marginTop: 50,
  marginRight: 50,
  marginBottom: 50,
  marginLeft: 50,
};

export default function AreaChart({ area }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const xScale = useMemo(
    () => scaleLinear().domain([0, 50]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  );
  const yScale = useMemo(
    () => scaleLinear().domain([0, 15]).range([dms.boundedHeight, 0]),
    [dms.boundedHeight]
  );
  const x = (d) => xScale(d.wavelength);
  const y = (d) => yScale(d.power);
  return (
    <div ref={ref}>
      <svg width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(',')})`}
        >
          <Area
            data={data}
            xAccessor={x}
            y0Accessor={yScale(0)}
            y1Accessor={y}
            fill={'#000000'}
            fillOpacity={0.2}
          />
          <Line
            data={data}
            xAccessor={x}
            yAccessor={y}
            fill={'none'}
            stroke="#000000"
            strokeWidth="2"
          />
          <g transform={`translate(${[0, dms.boundedHeight].join(',')})`}>
            <Axis domain={xScale.domain()} range={xScale.range()} variant="x" />
            <AxisY
              domain={yScale.domain()}
              range={[0, dms.boundedHeight]}
              variant="y"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
