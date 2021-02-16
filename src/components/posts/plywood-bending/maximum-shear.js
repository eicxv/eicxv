const table = {
  ratio: [1, 1.25, 1.5, 2, 3, 4, 5, 10, 20],
  F1: [0.42, 0.52, 0.59, 0.69, 0.79, 0.84, 0.87, 0.94, 1],
  F2: [0.83, 0.88, 0.92, 0.98, 1.07, 1.12, 1.17, 1.125, 1.333],
};

function getF(fList, ratio) {
  let i = table.ratio.findIndex((e) => e > ratio);
  if (i === -1 || i === table.ratio.length - 1) {
    return fList[table.ratio.length - 1];
  }
  let t = (ratio - table.ratio[i]) / (table.ratio[i + 1] - table.ratio[i]);
  return fList[i] + t * (fList[i + 1] - fList[i]);
}

const F1 = getF.bind(null, table.F1);
const F2 = getF.bind(null, table.F1);

function calculateShear(G, L, width, height, angle) {}

function calculateW(width, height) {
  let [a, b];
  if (width > height) {
    [a, b] = [width, height];
  } else {
    [b, a] = [width, height];
  }
  return (a * b ** 3 * F2(a / b)) / 3;
}
