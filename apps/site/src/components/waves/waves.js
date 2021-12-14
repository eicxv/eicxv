import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@eicxv/ui';
import { useTheme } from '@emotion/react';

import CreateWaves from './wavesProgram';

function Waves(props, ref) {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const wavesRef = useRef(null);
  const params = {
    lightColor: theme.colors.text,
    shadowColor: theme.colors.background,
    lightDirection: [0, 1, 3],
  };
  useEffect(() => {
    wavesRef.current = new CreateWaves(canvasRef.current, params);
  });
  useImperativeHandle(ref, () => ({
    setMultiplier: (value) => {
      wavesRef.current.setMultiplier(value);
    },
  }));

  return <Box {...props} as="canvas" ref={canvasRef}></Box>;
}

export default forwardRef(Waves);
