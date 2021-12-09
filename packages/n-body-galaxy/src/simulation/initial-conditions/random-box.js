const setPoint = (arr, coords, index) => {
  let i = index * 4;
  for (let offset = 0; offset < coords.length; offset++) {
    arr[i + offset] = coords[offset];
  }
};

const rand = (scale = 1) => (Math.random() - 0.5) * 2 * scale;

function randomBox(width, height) {
  const size = 4 * height * width;
  const generatePositions = () => {
    let positionData = new Float32Array(size);
    positionData = positionData.map(() => 1);
    for (let i = 0; i < height * width; i++) {
      setPoint(positionData, [rand(), rand(), rand(), 0.9], i);
    }
    return positionData;
  };
  const generateVelocities = () => {
    let velocityData = new Float32Array(size);
    velocityData = velocityData.map(() => 0);
    for (let i = 0; i < height * width; i++) {
      setPoint(velocityData, [rand(0.3), rand(0.3), rand(0.3)], i);
    }
    return velocityData;
  };
  return { position: generatePositions(), velocity: generateVelocities() };
}

export default randomBox;
