import React, { useEffect, useRef } from 'react';
import cubemapSources from './cubemap';

const isInView = (element) => {
  const rect = element.getBoundingClientRect();
  const height = window.innerHeight;
  return !(height < rect.top || 0 > rect.bottom);
};

const toggleAnimation = (bubble) => {
  if (bubble.id !== null) {
    cancelAnimationFrame(bubble.id);
    bubble.id = null;
  } else {
    bubble.render();
  }
};

export default (vert, frag, setup) => (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    setup(canvasRef.current, cubemapSources);
  });
  return (
    <canvas
      width="400"
      height="400"
      className="full-bleed"
      ref={canvasRef}
      style={{ width: '1000px' }}
      {...props}
    />
  );
};
