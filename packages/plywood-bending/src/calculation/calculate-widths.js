import { secantMethod } from '../utility/root-finders';

function calcTargetK(angles) {
  let a = [0, ...angles];
  let kList = [];
  let kPrev = 0;
  for (let i = 0; i < angles.length - 1; i++) {
    let k =
      (Math.sin(a[i + 1]) + kPrev * (a[i] - a[i + 1])) / (a[i + 1] - a[i + 2]);
    kPrev = k;
    kList.push(k);
  }
  return kList;
}

function calcJ(height, width) {
  // a > b
  let a, b;
  if (width > height) {
    [a, b] = [width / 2, height / 2];
  } else {
    [a, b] = [height / 2, width / 2];
  }
  const J =
    a * b ** 3 * (16 / 3 - 3.36 * (b / a) * (1 - (b ** 4 / 12) * a ** 4));
  return J;
}

function findWidth(k, materialThickness) {
  let f = (w) => calcJ(materialThickness, w) - k;
  let x0 = materialThickness / 2;
  let x1 = 2 * materialThickness;
  let width = secantMethod(f, x0, x1, 0.01, 20);
  return width;
}

function polylineAngles(polyline) {
  let angles = [];
  for (let i = 0; i < polyline.length - 1; i++) {
    let v = [
      polyline[i + 1][0] - polyline[i][0],
      polyline[i + 1][1] - polyline[i][1],
    ];
    angles.push(Math.atan2(v[1], v[0]));
  }
  return angles;
}

function validateK(k) {
  for (let e of k) {
    if (e < 0) {
      return false;
    }
  }
  return true;
}

export default function calcBarWidths(
  maxBarWidth,
  materialThickness,
  polyline
) {
  let angles = polylineAngles(polyline);
  let k = calcTargetK(angles);
  if (!validateK(k)) {
    return null;
  }
  let maxK = calcJ(materialThickness, maxBarWidth);
  let factor = maxK / Math.max(...k);
  k = k.map((k) => k * factor);
  let widths = k.map((k) => findWidth(k, materialThickness));
  return widths;
}
