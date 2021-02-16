import React, { useState } from "react";
import Schematic from "./schematic";
import InteractiveCurve from "./interactive-curve";
import FittedPolyline from "./fitted-polyline";
import { Box } from "rebass";
import { Label, Slider } from "@rebass/forms";

export default function PlywoodBending({ ...props }) {
  const [polyline, setPolyline] = useState([
    [-10, -5],
    [0, -10],
    [10, -5],
  ]);
  const [bezier, setBezier] = useState([
    [25, 90],
    [35, 50],
    [65, 50],
    [75, 90],
  ]);
  const [segments, setSegments] = useState(29);
  const [validCurve, setValidCurve] = useState(true);
  const materialThickness = 3;
  const maxBarWidth = 6;
  const barLength = 10;
  const connectorWidth = 2;

  return (
    <>
      <Box>
        <Label htmlFor="Segments">Segments</Label>
        <Slider
          id="Segments"
          name="Segments"
          value={segments}
          min={5}
          max={50}
          onChange={(e) => setSegments(e.target.value)}
        />
        <span>{segments} segments</span>
      </Box>
      <InteractiveCurve bezier={bezier} setBezier={setBezier}>
        <FittedPolyline
          valid={validCurve}
          bezierPoints={bezier}
          segments={segments}
          polyline={polyline}
          setPolyline={setPolyline}
        />
      </InteractiveCurve>
      <Schematic
        polyline={polyline}
        barLength={barLength}
        materialThickness={materialThickness}
        maxBarWidth={maxBarWidth}
        connectorWidth={connectorWidth}
        setValidCurve={setValidCurve}
      />
    </>
  );
}
