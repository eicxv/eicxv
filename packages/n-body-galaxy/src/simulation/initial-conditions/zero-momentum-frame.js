import { scale, scaleAndAdd } from '@eicxv/utility/src/v3';

export default function centerOfMassFrame(initialConditions) {
  const { position, velocity } = initialConditions;
  let momentumSum = [0, 0, 0];
  let centerOfMass = [0, 0, 0];
  let massSum = 0;
  for (let i = 0; i < velocity.length; i += 4) {
    const m = position[i + 3];
    const p = position.slice(i, i + 3);
    const v = velocity.slice(i, i + 3);
    massSum += m;
    momentumSum = scaleAndAdd(momentumSum, v, m);
    centerOfMass = scaleAndAdd(centerOfMass, p, m);
  }
  const velChange = scale(momentumSum, 1 / massSum);
  centerOfMass = scale(centerOfMass, 1 / massSum);
  for (let i = 0; i < velocity.length; i += 4) {
    for (let j = 0; j < 3; j++) {
      position[i + j] -= centerOfMass[j];
      velocity[i + j] -= velChange[j];
    }
  }
  return { position, velocity };
}

function testCenterOfMassFrame(position, velocity) {
  let momentumSum = [0, 0, 0];
  let centerOfMass = [0, 0, 0];
  for (let i = 0; i < velocity.length; i += 4) {
    const m = position[i + 3];
    const p = position.slice(i, i + 3);
    const v = velocity.slice(i, i + 3);
    momentumSum = scaleAndAdd(momentumSum, v, m);
    centerOfMass = scaleAndAdd(centerOfMass, p, m);
  }
  console.log('momentum', momentumSum);
  console.log('centerOfMass', centerOfMass);
}
