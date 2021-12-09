import { vec3 } from 'gl-matrix';

export function kineticEnergy(positionData, velocityData) {
  const n = velocityData.length / 4;
  let e = 0;
  for (let i = 0; i < n; i++) {
    let v = velocityData.slice(i * 4, i * 4 + 3);
    let mass = positionData[i * 4 + 3];
    e += mass * vec3.dot(v, v);
  }
  return e / 2;
}

export function potentialEnergy(positionData) {
  const G = 1;
  const n = positionData.length / 4;
  let e = 0;
  const p1p2 = new Float32Array(3);
  for (let i = 0; i < n; i++) {
    let p1 = positionData.slice(i * 4, i * 4 + 3);
    let m1 = positionData[i * 4 + 3];
    for (let j = i + 1; j < n; j++) {
      let p2 = positionData.slice(j * 4, j * 4 + 3);
      let m2 = positionData[j * 4 + 3];
      vec3.sub(p1p2, p2, p1);
      let dist = vec3.len(p1p2);
      e -= (G * m1 * m2) / dist;
    }
  }
  return e;
}
