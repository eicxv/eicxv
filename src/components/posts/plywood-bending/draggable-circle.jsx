import React from "react";
import { useDrag } from "react-use-gesture";
import { useSpring, to, animated } from "@react-spring/web";

export default function DraggableCircle({
  index,
  bezier,
  setBezier,
  r,
  hoverScale,
  xAxis,
  dragProps,
  ...props
}) {
  const bind = useDrag(
    ({ movement }) => {
      let points = [...bezier];
      if (xAxis) {
        movement[1] = points[index][1];
      }
      points[index] = movement;
      setBezier(points);
    },
    {
      initial: () => {
        return bezier[index];
      },
      ...dragProps,
    }
  );

  const [{ scale }, setScale] = useSpring(() => ({
    scale: 1,
  }));

  return (
    <animated.circle
      {...bind()}
      cx={0}
      cy={0}
      r={r}
      style={{ cursor: "grab" }}
      transform={to(
        [scale],
        (s) => `translate(${bezier[index][0]} ${bezier[index][1]}) scale(${s})`
      )}
      onMouseEnter={() => setScale({ scale: hoverScale })}
      onMouseLeave={() => setScale({ scale: 1 })}
      {...props}
    />
  );
}
