export function lerp(x, y, t) {
  return x * (1 - t) + y * t;
}

export function clamp(x, min = 0, max = 1) {
  return Math.max(min, Math.min(x, max));
}

export function arrayMin(array) {
  return array.reduce((a, b) => Math.min(a, b), Infinity);
}

export function arrayMax(array) {
  return array.reduce((a, b) => Math.max(a, b), -Infinity);
}

export function arrayMinMax(array) {
  let [min, max] = array.reduce(
    ([prevMin, prevMax], curr) => [
      Math.min(prevMin, curr),
      Math.max(prevMax, curr),
    ],
    [Infinity, -Infinity]
  );
  return [min, max];
}

export function linspace(start, end, n = 100) {
  var arr = [];
  var step = (end - start) / (n - 1);
  for (var i = 0; i < n; i++) {
    arr.push(start + step * i);
  }
  return arr;
}
