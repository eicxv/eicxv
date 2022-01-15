import { Button } from '@eicxv/ui';
import { clamp } from '@eicxv/utility/src/generic';

function ellipse(a, b, t) {
  return [a * Math.cos(t), b * Math.sin(t)];
}

const presets = [
  {
    name: 'Flickering Points',
    params: {
      u_feed: 0.0195,
      u_kill: 0.0568,
    },
    init: (rd) => {
      const stepSizePixels = 5;
      const stepX = stepSizePixels / rd.width;
      rd.uniforms.u_noise = false;
      rd.uniforms.u_fillConcentration = [1, 0];
      rd.initialize();
      rd.uniforms.u_brushRadius = 2;
      rd.uniforms.u_brushConcentration = [0, 1];
      rd.uniforms.u_brushPosition = [0.5 + stepX, 0.5];
      rd.brush();
      rd.uniforms.u_brushPosition = [0.5 - stepX, 0.5];
      rd.brush();
    },
  },
  {
    name: 'Spiral Waves',
    params: {
      u_feed: 0.0069,
      u_kill: 0.033,
    },
    init(rd) {
      const stepSizePixels = 20;
      const stepX = stepSizePixels / rd.width;
      const stepY = stepSizePixels / rd.height;
      rd.uniforms.u_noise = false;
      rd.uniforms.u_fillConcentration = rd.stableConcentration();
      rd.initialize();
      rd.uniforms.u_brushRadius = 4;
      rd.uniforms.u_brushConcentration = [0, 1];
      const n = 100;
      for (let i = 0; i < n; i++) {
        let t = (2 * Math.PI * i) / n;
        let p = ellipse(stepX, stepY, t);
        p[0] += 0.5;
        p[1] += 0.5;
        rd.uniforms.u_brushPosition = p;
        rd.brush();
        for (let j = 0; j < 10; j++) {
          rd.step();
        }
      }
      // rd.uniforms.u_brushRadius = 2;
      // rd.uniforms.u_brushConcentration = [0, 1];
      // rd.uniforms.u_brushPosition = [0.5 + stepX, 0.5];
      // rd.brush();
      // rd.uniforms.u_brushPosition = [0.5 - stepX, 0.5];
      // rd.brush();
    },
  },
];

export default function Presets({ RDRef, settings, setSettings }) {
  const runInit = (preset) => () => {
    const rd = RDRef.current;
    const uniforms = JSON.parse(JSON.stringify(rd.uniforms));
    setSettings(() => ({ ...settings, ...preset.params }));
    rd.uniforms.u_feed = preset.params.u_feed;
    rd.uniforms.u_kill = preset.params.u_kill;
    preset.init(rd);
    rd.uniforms = uniforms;
    rd.uniforms.u_feed = preset.params.u_feed;
    rd.uniforms.u_kill = preset.params.u_kill;
  };
  return (
    <div>
      {presets.map((preset) => (
        <Button key={preset.name} onClick={runInit(preset)}>
          {preset.name}
        </Button>
      ))}
    </div>
  );
}
