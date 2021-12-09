import cmfData from './data/cie-cmf-31.json';
import D65Data from './data/D65.json';
import ColorMatchingFunction from './color-matching-function';
import Illuminant from './illuminant';

export function outOfGamut(color) {
  return color.find((e) => e > 1 || e < 0) !== undefined;
}

export const D65 = new Illuminant(
  'D65',
  D65Data.D65,
  D65Data.span,
  D65Data.interval
);

export const E = new Illuminant(
  'E',
  D65.spd.map(() => 100),
  D65.span,
  D65.interval
);

export const cie31Cmf = new ColorMatchingFunction(
  cmfData.name,
  cmfData.cmf,
  cmfData.span,
  cmfData.interval
);
