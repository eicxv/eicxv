export function add(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

export function sub(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]];
}

export function scale(v, s) {
  return [v[0] * s, v[1] * s];
}

export function scaleAndAdd(v1, v2, s) {
  return [v1[0] + v2[0] * s, v1[1] + v2[1] * s];
}
export function mulElem(v1, v2) {
  return [v1[0] * v2[0], v1[1] * v2[1]];
}

export function divElem(v1, v2) {
  return [v1[0] / v2[0], v1[1] / v2[1]];
}

export function len(v) {
  return Math.sqrt(v[0] ** 2 + v[1] ** 2);
}

export function angle(v) {
  return Math.atan2(v[1], v[0]);
}

export function normalize(v) {
  const length = Math.sqrt(v[0] ** 2 + v[1] ** 2);
  return [v[0] / length, v[1] / length];
}

export function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

export function dist(v1, v2) {
  return Math.sqrt((v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2);
}

export function distSqr(v1, v2) {
  return (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2;
}

export function clone(v) {
  return [v[0], v[1]];
}

export function cartesianToPolar(v) {
  return [len(v), angle(v)];
}

export function polarToCartesian(v) {
  return [v[0] * Math.cos(v[1]), v[0] * Math.sin(v[1])];
}
