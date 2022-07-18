import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDrag } from '@use-gesture/react';

import { sub, divElem } from '@eicxv/utility/src/v2';
import ShallowWaterSystem from '../simulation/shallow-water';

const Canvas = styled.canvas`
  width: 1000px;
  height: 500px;
  touch-action: none;
  cursor: crosshair;
`;

const initialUniforms = {};

export default function ShallowWater() {
  const canvasRef = useRef(null);
  const shallowWaterRef = useRef(null);
  const elementRef = useRef({ origin: [0, 0], size: [0, 0] });

  useEffect(() => {
    const shallowWater = new ShallowWaterSystem(
      canvasRef.current,
      initialUniforms
    );
    shallowWaterRef.current = shallowWater;
    shallowWater.initialize();
    shallowWater.start();
  }, []);

  const bind = useDrag(
    ({ xy, last }) => {
      if (last) {
        return;
      }
      // convert xy to canvas uv space
      let coords = sub(xy, elementRef.current.origin);
      coords = divElem(coords, elementRef.current.size);
      coords[1] = 1 - coords[1];
      shallowWaterRef.current.setUniform('u_brushPosition', coords);
      shallowWaterRef.current.brush();
    },
    {
      from: () => {
        const { x, y, width, height } =
          canvasRef.current.getBoundingClientRect();
        elementRef.current = {
          origin: [x, y],
          size: [width, height],
        };
        return [0, 0];
      },
    }
  );

  return <Canvas ref={canvasRef} {...bind()}></Canvas>;
}
