import React, { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import { useChartDimensions, Line, Axis } from '@eicxv/ui';
import { arrayMinMax } from '@eicxv/utility/src/generic';

const chartSettings = {
  marginTop: 70,
  marginRight: 70,
  marginBottom: 70,
  marginLeft: 70,
};

export default function QuickGraph({ data }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, data.length - 1])
        .range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  );
  const yScale = useMemo(() => {
    const domain = arrayMinMax(data);
    domain[0] = Math.min(0, domain[0]);
    return scaleLinear().domain(domain).range([dms.boundedHeight, 0]);
  }, [dms.boundedHeight, data]);
  const x = (d, i) => xScale(i);
  const y = (d) => yScale(d);
  return (
    <div ref={ref}>
      <svg width={dms.width} height={400}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(',')})`}
        >
          <Line
            data={data}
            xAccessor={x}
            yAccessor={y}
            fill={'none'}
            stroke="black"
            strokeWidth="2"
          />
          <g transform={`translate(${[0, dms.boundedHeight].join(',')})`}>
            <Axis domain={xScale.domain()} range={xScale.range()} variant="x" />
            <Axis
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
