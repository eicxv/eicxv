import { falsePositionMethod } from '../utility/root-finders';

function dist(p1, p2) {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
}

export default class Bezier {
  constructor(points, intervals = 100) {
    this.points = points;
    this.ePoints = this.evaluateAtIntervals(intervals);
  }

  length() {
    let pts = this.ePoints;
    let len = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      len += dist(pts[i], pts[i + 1]);
    }
    return len;
  }

  evaluate(t) {
    const mt = 1 - t;
    let pts = this.points;
    let mt2 = mt * mt;
    let t2 = t * t;
    let a = mt2 * mt;
    let b = mt2 * t * 3;
    let c = mt * t2 * 3;
    let d = t * t2;

    let p = [0, 1].map(
      (i) => a * pts[0][i] + b * pts[1][i] + c * pts[2][i] + d * pts[3][i]
    );
    return p;
  }

  evaluateAtIntervals(steps = 100) {
    let points = [];
    steps--;
    for (let i = 0; i < steps; i++) {
      let t = i / (steps - 1);
      let p = this.evaluate(t);
      points.push(p);
    }
    return points;
  }

  nextCircleIntersection(start, center, radius) {
    let pts = this.ePoints.length;
    let getSign = (i) => Math.sign(dist(pts[i].p, center) - radius);
    let startSign = getSign(start);

    for (let i = start + 1; i < pts.length; i++) {
      if (startSign !== getSign(i)) {
        return i - 1;
      }
    }
    return null;
  }

  polylineEqualSegments(n, tolerance, maxIterations = 20) {
    let f = this._parameterOvershoot.bind(this, n);
    let x0 = dist(this.points[0], this.points[3]) / n;
    let x1 = (this.length() * 2) / n;
    let x = falsePositionMethod(f, x0, x1, tolerance, maxIterations);
    return this._getEqualSegmentPoints(n, x);
  }

  _parameterOvershoot(n, length) {
    let t = 0;
    for (let i = 0; i < n; i++) {
      let center = this.evaluate(t);
      let f = (t) => dist(this.evaluate(t), center) - length;
      t = this._nextCircleIntersection(f, t, 0.02, 300);
    }
    return t - 1;
  }

  _nextCircleIntersection(f, startX, stepSize = 0.02, maxSteps = 300) {
    let x, fx;
    let fStart = f(startX);
    for (let i = 0; i < maxSteps; i++) {
      x = i * stepSize + startX;
      fx = f(x);
      if (fStart * fx < 0) {
        return falsePositionMethod(f, x - stepSize, x, 0.001, 10);
      }
    }
    throw new Error('no intersection found');
  }

  _getEqualSegmentPoints(n, length) {
    let polyline = [];
    let t = 0;
    for (let i = 0; i < n; i++) {
      let center = this.evaluate(t);
      polyline.push(center);
      let f = (t) => dist(this.evaluate(t), center) - length;
      t = this._nextCircleIntersection(f, t, 0.02, 300);
    }
    polyline.push(this.evaluate(t));
    return polyline;
  }
}
