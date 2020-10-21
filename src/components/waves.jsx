import React, { useState, useEffect, useRef } from "react";

import CreateWaves from "./waves/waves";
import { theme } from "../utils/theme";

export default function Waves() {
  const canvasRef = useRef(null);
  const params = {
    lightColor: theme.color.primary,
    shadowColor: theme.color.secondary,
    lightDirection: [0, 1, 3],
  };
  useEffect(() => {
    new CreateWaves(canvasRef.current, params);
  });

  return (
    <canvas style={{ width: "100%", height: "400px" }} ref={canvasRef}></canvas>
  );
}
