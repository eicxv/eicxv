export function rgbComponentsToHex(rgb) {
  let hex = rgb.map((v) =>
    Math.round(clamp(v) * 255)
      .toString(16)
      .padStart(2, '0')
  );
  return `#${hex.join('')}`;
}

export function hslToRgbComponents(hslString) {
  const pattern = /hsl\((\d*), (\d*\.\d*)%, (\d*\.\d*)%\)/;
  let [_, h, s, l] = hslString.match(pattern);
  h = Number(h);
  s = Number(s);
  l = Number(l);
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  return [r + m, g + m, b + m];
}

export function hexToRgbComponents(hexString) {
  const hex = hexString;
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 4) {
    r = `0x + ${hex[1]} + ${hex[1]}`;
    g = `0x + ${hex[2]} + ${hex[2]}`;
    b = `0x + ${hex[3]} + ${hex[3]}`;
  } else if (hex.length === 7) {
    r = `0x + ${hex[1]} + ${hex[2]}`;
    g = `0x + ${hex[3]} + ${hex[4]}`;
    b = `0x + ${hex[5]} + ${hex[6]}`;
  }

  r = r / 255;
  g = g / 255;
  b = b / 255;

  return [r, g, b];
}
