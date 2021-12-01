export function add(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
}

export function sub(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}

export function scale(v, s) {
  return [v[0] * s, v[1] * s, v[2] * s];
}

export function scaleAndAdd(v1, v2, s) {
  return [v1[0] + v2[0] * s, v1[1] + v2[1] * s, v1[2] + v2[2] * s];
}

export function mulElem(v1, v2) {
  return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]];
}

export function divElem(v1, v2) {
  return [v1[0] / v2[0], v1[1] / v2[1], v1[2] / v2[2]];
}

export function len(v) {
  return Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
}

export function normalize(v) {
  const length = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return [v[0] / length, v[1] / length, v[2] / length];
}

export function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

export function dist(v1, v2) {
  return Math.sqrt(
    (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2 + (v1[2] - v2[2]) ** 2
  );
}

export function distSqr(v1, v2) {
  return (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2 + (v1[2] - v2[2]) ** 2;
}

export function clone(v) {
  return [v[0], v[1], v[2]];
}

export function transformMat3(v, m) {
  const [x, y, z] = v;
  return [
    x * m[0] + y * m[3] + z * m[6],
    x * m[1] + y * m[4] + z * m[7],
    x * m[2] + y * m[5] + z * m[8],
  ];
}

// spherical (rho, theta, phi)
// rho, radial distance
// theta, angle from x-axis in x-y plane
// phi, angle from z-axis
export function sphericalToCartesian(v) {
  const [rho, theta, phi] = v;
  const sin_theta = Math.sin(theta);
  const x = rho * sin_theta * Math.cos(phi);
  const y = rho * sin_theta * Math.sin(phi);
  const z = rho * Math.cos(theta);
  return [x, y, z];
}

export function cartesianToSpherical(v) {
  const [x, y, z] = v;
  const rho = len(v);
  const theta = Math.acos(z / rho);
  const phi = Math.atan2(y, x);
  return [rho, theta, phi];
}

// cylindrical (r, theta, z)
// r, axial distance from z-axis
// theta, angle from x-axis in x-y plane
// z, distance in z-direction
export function cylindricalToCartesian(v) {
  const [r, theta, z] = v;
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y, z];
}

export function cartesianToCylindrical(v) {
  const [x, y, z] = v;
  const r = Math.sqrt(x ** 2 + y ** 2);
  const theta = Math.atan2(y, x);
  return [r, theta, z];
}
