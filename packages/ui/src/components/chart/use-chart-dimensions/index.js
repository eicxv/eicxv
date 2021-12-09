import { useRef, useState, useEffect } from 'react';
import combineChartDimensions from './combine-chart-dimensions';

export default function useChartDimensions(passedSettings) {
  const ref = useRef();
  const dimensions = combineChartDimensions(passedSettings);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];
    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      const entry = entries[0];
      if (width != entry.contentRect.width) {
        setWidth(entry.contentRect.width);
      }
      if (height != entry.contentRect.height) {
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, []);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });
  return [ref, newSettings];
}
