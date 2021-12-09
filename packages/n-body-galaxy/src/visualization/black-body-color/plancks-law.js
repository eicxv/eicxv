import {
  SPEED_OF_LIGHT as c,
  PLANCK_CONSTANT as h,
  BOLTZMANN_CONSTANT as k,
} from '@eicxv/utility/src/constants';

const c1 = 2 * h * c ** 2;
const c2 = (h * c) / k;

export function plancksLaw(wavelength, temperature) {
  const L =
    c1 / (wavelength ** 5 * (Math.exp(c2 / (wavelength * temperature)) - 1));
  return L;
}
