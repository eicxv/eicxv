const TwoBodyUnityCircularData = [
  { p: [0.5, 0, 0], m: 1, v: [0, 1 / Math.sqrt(2), 0] },
  { p: [-0.5, 0, 0], m: 1, v: [0, -1 / Math.sqrt(2), 0] },
];

const TwoBodyCircularData = [
  { p: [0.5, 0, 0], m: 0.1, v: [0, 0.22360679774997896964, 0] },
  { p: [-0.5, 0, 0], m: 0.1, v: [0, -0.22360679774997896964, 0] },
];

const TwoBodyEllipticalData = [
  { p: [0.5, 0, 0], m: 0.9, v: [0, 0.5, 0] },
  { p: [-0.5, 0, 0], m: 0.9, v: [0, -0.5, 0] },
];

function createInitialConditionsFactory(data) {
  function createInitialConditions(width, height) {
    if (width * height !== data.length) {
      throw new Error(
        `${width} x ${height} incorrect size for data of length ${data.length}`
      );
    }
    const size = 4 * height * width;
    const positionData = new Float32Array(size);
    const velocityData = new Float32Array(size);
    data.forEach((body, index) => {
      let i = index * 4;
      for (let j = 0; j < 3; j++) {
        positionData[i + j] = body.p[j];
        velocityData[i + j] = body.v[j];
      }
      positionData[i + 3] = body.m;
    });
    return { position: positionData, velocity: velocityData };
  }
  return createInitialConditions;
}

export const TwoBodyUnityCircular = createInitialConditionsFactory(
  TwoBodyUnityCircularData
);
export const TwoBodyCircular =
  createInitialConditionsFactory(TwoBodyCircularData);
export const TwoBodyElliptical = createInitialConditionsFactory(
  TwoBodyEllipticalData
);
