export function identity() {
  // prettier-ignore
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
}

export function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  // prettier-ignore
  return [
    m00, m01, m02,
    m10, m11, m12,
    m20, m21, m22
  ];
}

export function fromNested(m) {
  // prettier-ignore
  return [
    m[0][0], m[0][1], m[0][2],
    m[1][0], m[1][1], m[1][2],
    m[2][0], m[2][1], m[2][2],
  ];
}

export function toNested(m) {
  return [
    [m[0], m[1], m[2]],
    [m[3], m[4], m[5]],
    [m[6], m[7], m[8]],
  ];
}
