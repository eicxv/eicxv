import React, { useMemo, useRef, useEffect, useState } from 'react';
import CutPath from './schematic-cut-path';
import calcBarWidths from '../calculation/calculate-widths';
import { Box, Flex } from '@eicxv/ui';

export default function Schematic({
  polyline,
  maxBarWidth,
  barLength,
  connectorWidth,
  materialThickness,
  setValidCurve,
  ...props
}) {
  const svgRef = useRef(null);
  const [scale, setScale] = useState(1);
  const widths = useMemo(() => {
    let w = calcBarWidths(maxBarWidth, materialThickness, polyline);
    if (w) {
      return [maxBarWidth / 2, ...w, maxBarWidth / 2];
    } else {
      return null;
    }
  }, [maxBarWidth, materialThickness, polyline]);

  let cutPathProps;
  let barCenterCenter;
  let tfm = '';
  if (widths) {
    barCenterCenter = Math.max(...widths) * 1.1;
    cutPathProps = {
      barWidths: widths,
      barLength,
      barCenterCenter,
      connectorWidth,
      vectorEffect: 'non-scaling-stroke',
    };
    const n = widths.length;
    const xMin = -widths[0] / 2;
    const xMax = n * barCenterCenter + widths[n - 1] / 2;
    // tfm = `scale(${scale}) translate(${-1 * xMin} 0)`;
    // tfm = `translate(${-(xMin + xMax) / 2} 0) scale(${scale})`;
    tfm = `scale(${scale}) translate(${-(xMin + xMax) / 2} 0)`;
    // tfm = `scale(${scale}) translate(0 0)`;
  }

  useEffect(() => {
    setValidCurve(widths !== null);
    if (widths === null) {
      return;
    }
    const rect = svgRef.current.getBoundingClientRect();
    const n = widths.length;
    const xMin = -widths[0] / 2;
    const xMax = n * barCenterCenter + widths[n - 1] / 2;
    const contentWidth = xMax - xMin;
    const contentHeight = 2 * (barLength + 2 * connectorWidth);
    const ys = (90 * (rect.height / rect.width)) / contentHeight;
    const xs = 90 / contentWidth;
    setScale(Math.min(ys, xs));
  }, [polyline]);
  if (widths === null) {
    return (
      <Flex justify="center" align="center" css={{ height: '10em' }}>
        <Box
          css={(theme) => ({
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes[6],
          })}
          as="span"
        >
          No solution
        </Box>
      </Flex>
    );
  }
  return (
    <svg
      ref={svgRef}
      viewBox="-50 -50 100 100"
      style={{
        display: 'block',
        height: `10em`,
        width: '100%',
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="black" strokeWidth={0.7} fill="none" transform={tfm}>
        <CutPath {...cutPathProps} />
      </g>
    </svg>
  );
}
