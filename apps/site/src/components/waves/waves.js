import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@eicxv/ui';
import { useTheme } from '@emotion/react';

import CreateWaves from './wavesProgram';
import { hslToRgbComponents } from '@eicxv/utility/src/color';

function Waves(props, ref) {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const wavesRef = useRef(null);
  const params = {
    lightColor: hslToRgbComponents(theme.colors.gray12),
    shadowColor: hslToRgbComponents(theme.colors.gray1),
    lightDirection: [0, 1, 3],
  };
  useEffect(() => {
    wavesRef.current = new CreateWaves(canvasRef.current, params);
  }, []);
  useImperativeHandle(ref, () => ({
    setMultiplier: (value) => {
      wavesRef.current.setMultiplier(value);
    },
  }));

  return <Box {...props} as="canvas" ref={canvasRef}></Box>;
}

export default forwardRef(Waves);
