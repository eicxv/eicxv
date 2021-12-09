import { scale, scaleAndAdd, transformMat3 } from '@eicxv/utility/src/v3';
import { fromValues as m3FromValues } from '@eicxv/utility/src/m3';

const xyzToRgbMat = m3FromValues(
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

export default class ColorMatchingFunction {
  constructor(name, cmf, span, interval) {
    this.name = name;
    this.cmf = cmf;
    this.span = span;
    this.interval = interval;
    this.illuminantLuminosity = 1;
  }

  setIlluminant(illuminantSpd) {
    this.illuminantLuminosity = this.luminosity(illuminantSpd);
  }

  wavelengths() {
    const wavelengths = [];
    for (let i = this.span[0]; i <= this.span[1]; i += this.interval) {
      wavelengths.push(i);
    }
    return wavelengths;
  }

  luminosity(spd) {
    if (spd.length !== this.cmf.length) {
      throw new Error('Incorrect spd length');
    }
    let L = 0;
    for (let i = 0; i < cmf.length; i++) {
      L += cmf[i][1] * spd[i];
    }
  }

  createSpdFromFunction(f) {
    const wavelengths = this.wavelengths();
    const spd = wavelengths.map((wl) => f(wl));
    return spd;
  }

  spdToXyz(spd, emmissive = false) {
    if (spd.length !== this.cmf.length) {
      throw new Error('Incorrect spd length');
    }
    let XYZ = [0, 0, 0];
    for (let i = 0; i < spd.length; i++) {
      XYZ = scaleAndAdd(XYZ, this.cmf[i], spd[i]);
    }
    if (!emmissive) {
      XYZ = scale(XYZ, 1 / this.illuminantLuminosity);
    }
    return XYZ;
  }

  rgbToSrgb(rgb) {
    for (let i = 0; i < 3; i++) {
      if (rgb[i] <= 0.0031308) {
        rgb[i] *= 12.92;
      } else {
        rgb[i] = 1.055 * rgb[i] ** (1 / 2.4) - 0.055;
      }
    }
    return rgb;
  }

  rgbToSrgb2(rgb) {
    const toSrgb = (c) => {
      if (c <= 0.0031308) {
        return c * 12.92;
      }
      return 1.055 * c ** (1 / 2.4) - 0.055;
    };
    const srgb = rgb.map(toSrgb);
    return srgb;
  }

  spdToSrgb(spd, emmissive = false) {
    let XYZ = this.spdToXyz(spd, emmissive);
    let rgb = transformMat3(XYZ, xyzToRgbMat);
    let srgb = this.rgbToSrgb(rgb);
    return srgb;
  }

  xyzToRgb(XYZ) {
    return transformMat3(XYZ, xyzToRgbMat);
  }
}
