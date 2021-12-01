import React, { useState, useRef } from 'react';
import { Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { clamp } from '@eicxv/utility/src/generic';

export default function Toggle({ value, onChange, alternatives, children }) {
  const handleChange = (event, value) => {
    if (value !== null) {
      onChange(event, value);
    }
  };

  return (
    <>
      {children}
      <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
        {alternatives.map((alt) => (
          <ToggleButton value={alt.value}>{alt.name}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}
