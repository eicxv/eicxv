import { useRef, useEffect } from 'react';
import { clamp } from '@eicxv/utility/src/generic';

const start = 1000;
const end = 30000;
const interval = 500;
const steps = Math.floor((end - start) / interval) + 1;

export default function DrawColors({ colors }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const imageData = ctx.getImageData(0, 0, colors.length, 1);
    const setPixel = (color, i) => {
      color = color.map((v) => Math.round(clamp(v) * 255));
      i *= 4;
      imageData.data[i + 0] = color[0];
      imageData.data[i + 1] = color[1];
      imageData.data[i + 2] = color[2];
      imageData.data[i + 3] = 255;
    };
    colors.forEach(setPixel);
    ctx.putImageData(imageData, 0, 0);
  }, []);
  return (
    <canvas
      width={colors.length}
      height="1"
      style={{ height: 100, width: '100%' }}
      ref={canvasRef}
    ></canvas>
  );
}
