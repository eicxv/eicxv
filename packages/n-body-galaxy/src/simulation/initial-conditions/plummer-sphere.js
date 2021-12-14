const rand = (min = 0, max = 1) => Math.random() * (max - min) + min;

function randOnSphere(radius) {
  const theta = Math.acos(rand(-1, 1));
  const phi = rand(0, 2 * Math.PI);
  return [
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta),
  ];
}

function genState() {
  const radius = 1 / Math.sqrt(rand() ** (-2 / 3) - 1);
  const position = randOnSphere(radius);
  let x = 0.0;
  let y = 0.1;
  while (y > x * x * (1.0 - x * x) ** 3.5) {
    x = rand(0, 1);
    y = rand(0, 0.1);
  }
  const speed = x * Math.sqrt(2) * (1 + radius ** 2) ** -0.25;
  const velocity = randOnSphere(speed);
  return [position, velocity];
}

function plummerSphere(width, height) {
  const size = 4 * height * width;
  const positions = new Float32Array(size);
  const velocities = new Float32Array(size);
  for (let i = 0; i < size; i += 3) {
    const [p, v] = genState();
    for (let j = 0; j < 3; j++) {
      positions[i + j] = p[j];
      velocities[i + j] = v[j];
    }
    positions[i + 3] = 1;
  }

  return { position: positions, velocity: velocities };
}

export default plummerSphere;
