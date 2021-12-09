import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
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

// export default function DynamicRelaxationFactory(dr) {
//   function DynamicRelaxation() {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//       if (typeof window !== 'undefined') {
//         dr(canvasRef.current);
//       }
//     }, []);

//     return (
//       <main>
//         <Canvas ref={canvasRef}></Canvas>
//       </main>
//     );
//   }
//   return DynamicRelaxation;
// }
