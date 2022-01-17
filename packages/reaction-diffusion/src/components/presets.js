import { Button } from '@eicxv/ui';

function ellipse(a, b, t) {
  return [a * Math.cos(t), b * Math.sin(t)];
}

function brush(rd, position, concentration, radius) {
  rd.uniforms.u_brushRadius = radius;
  rd.uniforms.u_brushConcentration = concentration;
  rd.uniforms.u_brushPosition = position;
  rd.brush();
}

function fill(rd, concentration, noise = false) {
  rd.uniforms.u_noise = noise;
  rd.uniforms.u_fillConcentration = concentration;
  rd.initialize();
}

const presets = [
  {
    name: 'Multiplying Dots',
    params: {
      u_feed: 0.0195,
      u_kill: 0.0568,
    },
    init: (rd) => {
      const stepSizePixels = 5;
      const stepX = stepSizePixels / rd.width;
      let concentration = [1, 0];
      fill(rd, concentration);
      concentration = [0, 1];
      const radius = 2;
      let position = [0.5 + stepX, 0.5];
      brush(rd, position, concentration, radius);
      position = [0.5 - stepX, 0.5];
      brush(rd, position, concentration, radius);
    },
  },
  {
    name: 'Spiral Waves',
    params: {
      u_feed: 0.0069,
      u_kill: 0.033,
    },
    init(rd) {
      const circleRadius = 20;
      const stepX = circleRadius / rd.width;
      const stepY = circleRadius / rd.height;
      const numberOfDots = 100;
      const iterationsPerDot = 10;
      let concentration = rd.stableConcentration();
      fill(rd, concentration);
      const radius = 4;
      concentration = [0, 1];
      const n = 100;
      for (let i = 0; i < numberOfDots; i++) {
        let t = (2 * Math.PI * i) / n;
        let position = ellipse(stepX, stepY, t);
        position[0] += 0.5;
        position[1] += 0.5;
        brush(rd, position, concentration, radius);
        for (let j = 0; j < iterationsPerDot; j++) {
          rd.step();
        }
      }
    },
  },
  {
    name: 'Giraffe',
    params: {
      u_feed: 0.0978,
      u_kill: 0.0555,
    },
    init(rd) {
      const numberOfDots = 18;
      let concentration = [1, 0];
      fill(rd, concentration);
      const radius = 3;
      concentration = [0, 1];
      for (let i = 0; i < numberOfDots; i++) {
        let position = [Math.random(), Math.random()];
        brush(rd, position, concentration, radius);
      }
    },
  },
  {
    name: 'Giraffe Inverted',
    params: {
      u_feed: 0.1104,
      u_kill: 0.0555,
    },
    init(rd) {
      const numberOfDots = 18;
      let concentration = [0, 1];
      fill(rd, concentration);
      const radius = 3;
      concentration = [1, 0];
      for (let i = 0; i < numberOfDots; i++) {
        let position = [Math.random(), Math.random()];
        brush(rd, position, concentration, radius);
      }
    },
  },
  {
    name: 'Kelp Forest',
    params: {
      u_feed: 0.082,
      u_kill: 0.06,
    },
    init(rd) {
      let concentration = [0, 1];
      fill(rd, concentration);
      concentration = [1, 0];
      const position = [0.5, 0.5];
      const radius = 6;
      brush(rd, position, concentration, radius);
    },
  },
  {
    name: 'Strings',
    params: {
      u_feed: 0.082,
      u_kill: 0.06,
    },
    init(rd) {
      const numberOfDots = 18;
      let concentration = [1, 0];
      fill(rd, concentration);
      const radius = 3;
      concentration = [0, 1];
      for (let i = 0; i < numberOfDots; i++) {
        let position = [Math.random(), Math.random()];
        brush(rd, position, concentration, radius);
      }
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
