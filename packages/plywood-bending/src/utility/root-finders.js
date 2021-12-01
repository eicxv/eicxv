export function secantMethod(f, x0, x1, tolerance, maxIterations) {
  let x2, fx2;
  let fx0 = f(x0);
  let fx1 = f(x1);
  for (let i = 0; i < maxIterations; i++) {
    x2 = x1 - (fx1 * (x1 - x0)) / (fx1 - fx0);
    fx2 = f(x2);
    if (Math.abs(fx2) < tolerance) {
      return x2;
    }
    x0 = x1;
    x1 = x2;
    fx0 = fx1;
    fx1 = fx2;
  }
  throw new Error('no root found');
}

export function falsePositionMethod(f, x0, x1, xTolerance, maxIterations) {
  let fl = f(x0);
  let fh = f(x1);
  let xl, xh, x, fx, del;
  if (fl * fh > 0) {
    throw new Error('wrong input signs');
  }
  if (fl < 0) {
    xl = x0;
    xh = x1;
  } else {
    let tmp = fl;
    fl = fh;
    fh = tmp;
    xh = x0;
    xl = x1;
  }
  for (let _ = 0; _ < maxIterations; _++) {
    x = xl + ((xh - xl) * fl) / (fl - fh);
    fx = f(x);

    if (fx < 0) {
      del = xl - x;
      xl = x;
      fl = fx;
    } else {
      del = xh - x;
      xh = x;
      fh = fx;
    }
    if (Math.abs(del) < xTolerance || fx === 0) {
      return x;
    }
  }
  return x;
}
