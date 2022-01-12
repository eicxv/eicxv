import { useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import styled from '@emotion/styled';
import { sub, divElem, mulElem } from '@eicxv/utility/src/v2';
import { clamp } from '@eicxv/utility/src/generic';

const Svg = styled.svg`
  width: 500px;
  height: 500px;
  touch-action: none;
  cursor: crosshair;
`;

const svgViewport = [0.08, 0.3];

export default function ParameterMapControl({ parameters, setParameters }) {
  const svgRef = useRef(null);
  const elementRef = useRef({ origin: [0, 0], size: [0, 0] });

  const bind = useDrag(
    ({ xy, last }) => {
      if (last) {
        return;
      }
      let coords = sub(xy, elementRef.current.origin);
      coords = divElem(coords, elementRef.current.size);
      coords[0] = clamp(coords[0]);
      coords[1] = clamp(1 - coords[1]);

      coords = mulElem(coords, svgViewport);

      setParameters({
        u_feed: coords[1].toFixed(4),
        u_kill: coords[0].toFixed(4),
      });
    },
    {
      from: () => {
        const { x, y, width, height } = svgRef.current.getBoundingClientRect();
        elementRef.current = {
          origin: [x, y],
          size: [width, height],
        };
        return [0, 0];
      },
    }
  );
  const x = parameters.u_kill / svgViewport[0];
  const y = parameters.u_feed / svgViewport[1];

  return (
    <Svg width="100" height="100" viewBox="0 0 1 1" ref={svgRef} {...bind()}>
      <g
        style={{
          transform: `scale(1, -1) translate(0, -100%)`,
        }}
      >
        <circle
          style={{
            fill: 'black',
            stroke: 'none',
          }}
          cx={x}
          cy={y}
          r={0.003}
        ></circle>
        <circle
          style={{
            vectorEffect: 'non-scaling-stroke',
            fill: 'none',
            strokeWidth: 1,
            stroke: 'black',
          }}
          cx={x}
          cy={y}
          r={0.03}
        ></circle>
      </g>
      <g>
        <path
          style={{
            vectorEffect: 'non-scaling-stroke',
            fill: 'none',
            stroke: '#000000',
            strokeWidth: 1,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeOpacity: 1,
          }}
          d="M 0.00079,0.16254 C 0.03558,0.18013 0.78820,0.56623 0.78239,0.79413 0.77792,0.96959 0.37822,0.98980 0.14334,1.00112"
        />
        <path
          style={{
            vectorEffect: 'non-scaling-stroke',
            fill: 'none',
            stroke: '#000000',
            strokeWidth: 1,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 4,
            strokeDasharray: '5, 5',
            strokeDashoffset: 0,
            strokeOpacity: 1,
          }}
          d="M 0.78118,0.79722 C 0.77827,0.90933 0.47347,0.98529 0.03914,1"
        />
      </g>
    </Svg>
  );
}
