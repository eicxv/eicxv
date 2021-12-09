import colorData from './colors.json';
import { lerp, clamp } from '@eicxv/utility/src/generic';

const mainSequenceStars = [
  { temperatureSpan: [2400, 3700], cumulativeFraction: 0.7655 },
  { temperatureSpan: [3700, 5200], cumulativeFraction: 0.8865 },
  { temperatureSpan: [5200, 6000], cumulativeFraction: 0.9625 },
  { temperatureSpan: [6000, 7500], cumulativeFraction: 0.9925 },
  { temperatureSpan: [7500, 10000], cumulativeFraction: 0.9985 },
  { temperatureSpan: [10000, 30000], cumulativeFraction: 1 },
];

function sampleMainSequenceStarTemperature() {
  const r = Math.random();
  let span;
  for (let star of mainSequenceStars) {
    if (r < star.cumulativeFraction) {
      span = star.temperatureSpan;
      break;
    }
  }
  const T = lerp(span[0], span[1], Math.random());
  return T;
}

function uniformRandomTemperature() {
  return (
    Math.random() * (colorData.span[1] - colorData.span[0]) + colorData.span[0]
  );
}

function sampleColor(T) {
  const span = colorData.span;
  const interval = colorData.interval;
  const colors = colorData.colors;
  let i = Math.round((T - span[0]) / interval);
  i = clamp(i, 0, colors.length - 1);
  return colors[i];
}

export function getColor() {
  const T = sampleMainSequenceStarTemperature();
  return sampleColor(T);
}
