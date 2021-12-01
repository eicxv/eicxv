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
  const transform = to(
    [spring.x],
    (s) => `translate(${bezier[index][0]} ${bezier[index][1]}) scale(${s})`
  );

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
    <animated.circle
      {...bind()}
      cx={0}
      cy={0}
      r={r}
      style={{ cursor: 'grab', touchAction: 'none' }}
      transform={transform}
      onMouseEnter={() => api.start({ x: hoverScale })}
      onMouseLeave={() => api.start({ x: 1 })}
      {...props}
    />
  );
}
