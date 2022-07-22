import styled from '@emotion/styled';
import { useDrag } from '@use-gesture/react';
import React, { useEffect, useRef, useState } from 'react';

import { divElem, sub } from '@eicxv/utility/src/v2';
import ReactionDiffusionSystem from '../simulation/reaction-diffusion';
import { presets } from './presets';
import Controls from './rd-controls';

const preset = presets[0];

const Canvas = styled.canvas`
  width: 100%;
  height: 500px;
  touch-action: none;
  cursor: crosshair;
`;

const initialUniforms = { u_feed: 0.082, u_kill: 0.06 };

export default function ReactionDiffusion() {
  const canvasRef = useRef(null);
  const reactionDiffusionRef = useRef(null);
  const elementRef = useRef({ origin: [0, 0], size: [0, 0] });

  useEffect(() => {
    const reactionDiffusion = new ReactionDiffusionSystem(
      canvasRef.current,
      initialUniforms
    );
    reactionDiffusionRef.current = reactionDiffusion;
    reactionDiffusion.initialize();
    reactionDiffusion.start();

    preset.init(reactionDiffusion);
    reactionDiffusion.uniforms.u_feed = preset.params.u_feed;
    reactionDiffusion.uniforms.u_kill = preset.params.u_kill;
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
      reactionDiffusionRef.current.setUniform('u_brushPosition', coords);
      reactionDiffusionRef.current.brush();
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

  return (
    <>
      <Canvas ref={canvasRef} {...bind()}></Canvas>
      <Controls RDRef={reactionDiffusionRef} />
    </>
  );
}
