import React from 'react';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated, to } from '@react-spring/web';

import { clamp } from '@eicxv/utility/src/generic';

export default function DraggableCircle({
  index,
  bezier,
  setBezier,
  r,
  hoverScale,
  xAxis,
  getScale,
  bounds,
  dragProps,
  ...props
}) {
  const [spring, api] = useSpring(() => ({ x: 1 }));
  const transform = `translate(${bezier[index][0]} ${bezier[index][1]})`;
  const scaleHandle = to([spring.x], (s) => `scale(${s})`);

  const bind = useDrag(
    ({ offset }) => {
      const sc = getScale();
      let points = [...bezier];
      points[index][0] = clamp(offset[0] * sc, ...bounds.x);
      if (!xAxis) {
        points[index][1] = clamp(offset[1] * sc, ...bounds.y);
      }
      setBezier(points);
    },
    {
      from: () => {
        const sc = getScale();
        const p = [...bezier[index]];
        p[0] = p[0] / sc;
        p[1] = p[1] / sc;
        return p;
      },
      ...dragProps,
    }
  );

  return (
    <g transform={transform}>
      <animated.circle
        style={{}}
        cx={0}
        cy={0}
        r={r}
        transform={scaleHandle}
        {...props}
      />
      <line
        {...bind()}
        stroke="transparent"
        strokeWidth="42px"
        style={{
          strokeLinecap: 'round',
          vectorEffect: 'non-scaling-stroke',
          cursor: 'grab',
          touchAction: 'none',
        }}
        onMouseEnter={() => api.start({ x: hoverScale })}
        onMouseLeave={() => api.start({ x: 1 })}
      ></line>
    </g>
  );
}
