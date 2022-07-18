import {
  Canvas,
  cableSystemDemo,
  pendulumDemo,
  minimalSurfaceDemo,
} from '@eicxv/dynamic-relaxation';

export default function Demo() {
  return (
    <div>
      <Canvas render={cableSystemDemo} />;
      <Canvas render={pendulumDemo} />;
      <Canvas render={minimalSurfaceDemo} />;
    </div>
  );
}
