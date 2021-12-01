import React from "react";

function cutPath(barWidths, barCenterCenter, barLength, connectorWidth) {
  let d = [`${-barWidths[0] / 2},0`];
  let reducer = (d, w, i) => {
    let x = i * barCenterCenter;
    let even = i % 2 === 0;
    let sign = even ? -1 : 1;
    x += (sign * w) / 2;
    let y = even ? connectorWidth : barLength + 2 * connectorWidth;
    d.push(`${x},${y}`);
    y = !even ? connectorWidth : barLength + 2 * connectorWidth;
    d.push(`${x},${y}`);
    return d;
  };
  d = barWidths.reduce(reducer, d);
  let x = (barWidths.length - 1) * barCenterCenter;
  x += barWidths[barWidths.length - 1] / 2;
  if (barWidths.length % 2 !== 0) {
    d.push(`${x},${barLength + 2 * connectorWidth}`);
  }
  d.push(`${x},${0}`);
  return d.join(" ");
}

function rects(barWidths, barCenterCenter, barLength, connectorWidth) {
  let rects = [];
  let y = -barLength - connectorWidth;
  let height = 2 * (barLength + connectorWidth);
  for (let i = 0; i < barWidths.length - 1; i += 2) {
    let width = barCenterCenter - (barWidths[i] + barWidths[i + 1]) / 2;
    let x = i * barCenterCenter + barWidths[i] / 2;
    rects.push({ x, y, width, height });
  }
  return rects;
}

export default function CutPath({
  barWidths,
  barLength,
  barCenterCenter,
  connectorWidth,
  ...props
}) {
  let d = cutPath(barWidths, barCenterCenter, barLength, connectorWidth);
  let rectProps = rects(barWidths, barCenterCenter, barLength, connectorWidth);

  return (
    <g>
      <polyline points={d} {...props} />
      <polyline points={d} transform="scale(1, -1)" {...props} />
      {rectProps.map((rp, i) => (
        <rect {...rp} key={i} {...props}></rect>
      ))}
    </g>
  );
}
