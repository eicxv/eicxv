import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
`;

export default function DynamicRelaxation({ render }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    render(canvasRef.current);
  }, []);

  return (
    <main>
      <Canvas ref={canvasRef}></Canvas>
    </main>
  );
}
