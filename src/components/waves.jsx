import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

import CreateWaves from "./waves/waves";
import { useTheme } from "emotion-theming";

function Waves(props, ref) {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const wavesRef = useRef(null);
  const params = {
    lightColor: theme.color.primary,
    shadowColor: theme.color.secondary,
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

  return <canvas css={props.canvasCss} ref={canvasRef}></canvas>;
}

export default forwardRef(Waves);
