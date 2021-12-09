import { cie31Cmf } from './color-matching';
import { plancksLaw } from './plancks-law';
import { scale } from '@eicxv/utility/src/v3';

export function colorAtTemperature(T) {
  const spd = cie31Cmf.createSpdFromFunction((wl) => plancksLaw(wl * 1e-9, T));
  let XYZ = cie31Cmf.spdToXyz(spd, true);
  XYZ = scale(XYZ, 1 / XYZ[1]);
  const rgb = cie31Cmf.xyzToRgb(XYZ);
  const srgb = cie31Cmf.rgbToSrgb(rgb);
  return srgb;
}

export function colorData() {
  const interval = 100;
  const span = [2000, 15000];
  const temperatures = [];
  for (let T = span[0]; T <= span[1]; T += interval) {
    temperatures.push(T);
  }
  const colors = temperatures.map(colorAtTemperature);
  const data = { colors, interval, span };
  return data;
}
