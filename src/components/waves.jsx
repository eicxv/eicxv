import React, { useState, useEffect, useRef } from "react";

import CreateWaves from "./waves/waves";

export default function Waves() {
  const canvasRef = useRef(null);
  useEffect(() => {
    new CreateWaves(canvasRef.current);
  });

  return (
    <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef}></canvas>
  );
}
