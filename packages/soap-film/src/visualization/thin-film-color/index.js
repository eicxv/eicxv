import { glMatrix, mat3, vec3 } from 'gl-matrix';
import cmfData from './cie-cmf-31.json';
import D65Data from './D65.json';

const { D65: D65Complete, span: D65Span, interval } = D65Data;
const { cmf, span: cmfSpan } = cmfData;
const D65 = D65Complete.slice(
  (cmfSpan[0] - D65Span[0]) / interval,
  D65Complete.length - (cmfSpan[1] - D65Span[1]) / interval
);
const E = D65.map(() => 100);

glMatrix.setMatrixArrayType(Array);

let D65Luminosity = 0;
for (let i = 0; i < cmf.length; i++) {
  D65Luminosity += cmf[i][1] * D65[i];
}

const clamp = (x) => Math.max(0, Math.min(x, 1));

export function outOfGamut(color) {
  return color.find((e) => e > 1 || e < 0) !== undefined;
}

const toHex = (rgb) => {
  let hex = rgb.map((v) =>
    Math.round(clamp(v) * 255)
      .toString(16)
      .padStart(2, '0')
  );
  return `#${hex.join('')}`;
};

const xyzToRgbMat = mat3.fromValues(
  3.24096994,
  -0.96924364,
  0.05563008,
  -1.53738318,
  1.8759675,
  -0.20397696,
  -0.49861076,
  0.04155506,
  1.05697151
);

function specToXyz(spectrum) {
  let XYZ = [0, 0, 0];
  for (let i = 0; i < spectrum.length; i++) {
    vec3.scaleAndAdd(XYZ, XYZ, cmf[i], spectrum[i]);
  }
  return vec3.scale(XYZ, XYZ, 1 / D65Luminosity);
}

function rgbToSrgb(rgb) {
  for (let i = 0; i < 3; i++) {
    if (rgb[i] <= 0.0031308) {
      rgb[i] *= 12.92;
    } else {
      rgb[i] = 1.055 * rgb[i] ** (1 / 2.4) - 0.055;
    }
  }
  return rgb;
}

function specToSrgb(spectrum, hex = false) {
  let XYZ = specToXyz(spectrum);
  let rgb = vec3.transformMat3(XYZ, XYZ, xyzToRgbMat);
  let srgb = rgbToSrgb(rgb);
  return hex ? toHex(srgb) : srgb;
}

function specToSrgbGrey(spectrum, grey, hex = false) {
  let XYZ = specToXyz(spectrum);
  vec3.scale(XYZ, XYZ, grey);
  let rgb = vec3.transformMat3(XYZ, XYZ, xyzToRgbMat);
  let srgb = rgbToSrgb(rgb);
  return hex ? toHex(srgb) : srgb;
}

export { cmf, D65, E, specToSrgb, specToXyz, specToSrgbGrey, xyzToRgbMat };
