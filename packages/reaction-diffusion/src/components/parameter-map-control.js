import { useState, useRef, useMemo } from 'react';
import { useDrag } from '@use-gesture/react';
import styled from '@emotion/styled';
import { sub, divElem, mulElem } from '@eicxv/utility/src/v2';
import { clamp } from '@eicxv/utility/src/generic';
import { scaleLinear } from 'd3-scale';
import { useChartDimensions, GraphLabel, Axis } from '@eicxv/ui';

const Svg = styled.svg({
  width: '100%',
  height: '100%',
});

const SvgWrapper = styled.div({
  width: '100%',
  height: '400px',
  position: 'relative',
});

const chartSettings = {
  marginTop: 30,
  marginRight: 50,
  marginBottom: 70,
  marginLeft: 70,
};

const svgViewport = [0.08, 0.3];

export default function ParameterMapControl({
  parameters,
  setParameters,
  ...other
}) {
  const svgRef = useRef(null);
  const [ref, dms] = useChartDimensions(chartSettings);
  const svgSizeRef = useRef({ origin: [0, 0], size: [0, 0] });

  const xScale = useMemo(
    () =>
      scaleLinear().domain([0, svgViewport[0]]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  );
  const yScale = useMemo(
    () =>
      scaleLinear().domain([0, svgViewport[1]]).range([dms.boundedHeight, 0]),
    [dms.boundedHeight]
  );

  const bind = useDrag(
    ({ xy, last }) => {
      if (last) {
        return;
      }
      let coords = sub(xy, svgSizeRef.current.origin);
      coords = divElem(coords, svgSizeRef.current.size);
      coords[0] = clamp(coords[0]);
      coords[1] = clamp(1 - coords[1]);

      coords = mulElem(coords, svgViewport);

      setParameters({
        u_feed: coords[1],
        u_kill: coords[0],
      });
    },
    {
      from: () => {
        const { x, y, width, height } = svgRef.current.getBoundingClientRect();
        svgSizeRef.current = {
          origin: [x, y],
          size: [width, height],
        };
        return [0, 0];
      },
    }
  );

  return (
    <SvgWrapper ref={ref}>
      <Svg width={dms.width} height={dms.height} {...other}>
        <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
          <g transform={`translate(0, ${dms.boundedHeight})`}>
            <g
              css={(theme) => ({
                fontFamily: theme.fonts.code,
                fontSize: theme.fontSizes[1],
              })}
            >
              <Axis
                pixelsPerTick={80}
                domain={xScale.domain()}
                range={xScale.range()}
                variant="x"
              />
              <Axis
                pixelsPerTick={60}
                domain={yScale.domain()}
                range={[0, dms.boundedHeight]}
                variant="y"
              />
            </g>
            <g
              css={(theme) => ({
                fontSize: theme.fontSizes[3],
              })}
            >
              <GraphLabel range={xScale.range()} variant="x">
                Feed
              </GraphLabel>
              <GraphLabel range={yScale.range()} variant="y">
                Kill
              </GraphLabel>
            </g>
          </g>
          <g
            transform={`translate(${
              (dms.boundedWidth * parameters.u_kill) / svgViewport[0]
            },${
              dms.boundedHeight +
              (-dms.boundedHeight * parameters.u_feed) / svgViewport[1]
            })`}
          >
            <circle
              style={{
                fill: 'black',
                stroke: 'none',
              }}
              r={1}
            ></circle>
            <circle
              style={{
                vectorEffect: 'non-scaling-stroke',
                fill: 'none',
                strokeWidth: 2,
                stroke: 'black',
              }}
              r={10}
            ></circle>
          </g>
          <g
            style={{
              transform: `scale(${dms.boundedWidth}, ${dms.boundedHeight})`,
              fill: 'none',
              stroke: '#000000',
              strokeWidth: 1,
              strokeOpacity: 1,
            }}
          >
            <path
              style={{
                vectorEffect: 'non-scaling-stroke',
              }}
              d="M 0.00079,0.16254 C 0.03558,0.18013 0.78820,0.56623 0.78239,0.79413 0.77792,0.96959 0.37822,0.98980 0.14334,1.00112"
            />
            <path
              style={{
                vectorEffect: 'non-scaling-stroke',
                strokeDasharray: '5, 5',
                strokeDashoffset: 0,
              }}
              d="M 0.78118,0.79722 C 0.77827,0.90933 0.47347,0.98529 0.03914,1"
            />
            <rect
              style={{
                vectorEffect: 'non-scaling-stroke',
                stroke: 'black',
                strokeWidth: '0.3',
                fill: 'transparent',
                touchAction: 'none',
                cursor: 'crosshair',
              }}
              width="1"
              height="1"
              ref={svgRef}
              {...bind()}
            ></rect>
          </g>
        </g>
      </Svg>
    </SvgWrapper>
  );
}
