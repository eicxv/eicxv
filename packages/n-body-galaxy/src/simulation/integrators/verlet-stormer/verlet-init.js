// function getElement(arr, i, range = 3) {
//   const elementIndex = i * 4;
//   return arr.slice(elementIndex, elementIndex + range);
// }

// function addVelocity(positions, i, velocity) {
//   const elementIndex = i * 4;
//   positions[elementIndex] += velocity[0];
//   positions[elementIndex + 1] += velocity[1];
//   positions[elementIndex + 2] += velocity[2];
// }

// function updateElement(arr, index, data) {
//   const elementIndex = index * 4;
//   for (const offset = 0; offset < data.length; offset++) {
//     arr[elementIndex + offset] = data[offset];
//   }
// }

// const softening = 0.1;

// function updateVelocity(positionData, velocityData, index, dt) {
//   const position = getElement(positionData, index);
//   const velocity = getElement(velocityData, index);
//   let acceleration = 0;

//   for (const i = 0; i < positionData.length / 4; i++) {
//     if (i === index) continue;
//     const otherPos = getElement(positionData, i);
//     const toOther = vec3.sub(new Float32Array(3), otherPos, position);
//     const inv_r3 = Math.pow(vec3.dot(toOther, toOther) + softening, -1.5);
//     acceleration += toOther * inv_r3;
//   }
//   vec3.scale(acceleration, acceleration, dt);
//   vec3.add(velocity, velocity, acceleration);
//   updateElement(velocityData, index, velocity);
// }

// export default function positionInit(initialState, dt) {
//   const { position, velocity } = initialState;
//   const prevPos = position.slice();
//   for (let i = 0; i < position.length; i += 4) {
//     let vel = getElement(velocity, i);
//     vel = scale(vel, dt);
//     addVelocity(position, i, vel);
//   }
//   const currPos = position;
//   return { prev: prevPos, curr: currPos };
// }

export default function positionInit(initialState, dt) {
  const { position, velocity } = initialState;
  const prevPosition = position.slice();
  for (let i = 0; i < position.length; i++) {
    if (i % 4 === 3) {
      continue;
    }
    position[i] += velocity[i] * dt;
  }
  return { prev: prevPosition, curr: position };
}
