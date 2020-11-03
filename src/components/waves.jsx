import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

import CreateWaves from "./waves/waves";

function Waves({ className, config, other }, ref) {
  const canvasRef = useRef(null);
  const wavesRef = useRef(null);
  const params = {
    lightColor: "#f5f5f5",
    shadowColor: "#212121",
    lightDirection: [0, 1, 3],
    ...config,
  };
  useEffect(() => {
    wavesRef.current = new CreateWaves(canvasRef.current, params);
  });
  useImperativeHandle(ref, () => ({
    setMultiplier: (value) => {
      wavesRef.current.setMultiplier(value);
    },
  }));

  return <canvas className={className} {...other} ref={canvasRef}></canvas>;
}

export default forwardRef(Waves);
