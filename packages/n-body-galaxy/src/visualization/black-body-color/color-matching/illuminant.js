import { lerp } from '@eicxv/utility/src/generic';

export default class Illuminant {
  constructor(name, spd, span, interval) {
    this.name = name;
    this.spd = spd;
    this.span = span;
    this.interval = interval;
  }

  changeSpanAndInterval(newSpan, newInterval) {
    if (newSpan[0] < this.span[0] || newSpan[1] > this.span[1]) {
      throw new Error('New span must be subset of original span.');
    }
    const wavelengths = [];
    for (let i = newSpan[0]; i <= newSpan[1]; i += newInterval) {
      wavelengths.push(i);
    }
    this.spd = wavelengths.map(this.sample);
    this.span = newSpan;
    this.interval = newInterval;
  }

  sample(wavelength) {
    let i = (wavelength - this.span[0]) / this.interval;
    if (Number.isInteger(i)) {
      return this.spd[i];
    }
    const a = this.spd[Math.floor(i)];
    const b = this.spd[Math.ceil(i)];
    const t = i % 1;
    return lerp(a, b, t);
  }
}
