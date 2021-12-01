import React, { useState, useRef } from 'react';
import { Typography, Slider, TextField, Stack } from '@mui/material';

import { clamp } from '@eicxv/utility/src/generic';

export default function Control({
  name,
  min,
  max,
  step,
  type,
  value,
  onValid,
}) {
  const [inputString, setInput] = useState(value);
  const prevValueRef = useRef(null);
  if (value !== prevValueRef.current) {
    if (value !== Number(inputString)) {
      setInput(value);
    }
  }
  prevValueRef.current = value;

  const regex = {
    validSymbols: /(\-|\.|\d)+/,
    stricAllowed: /^-?((0|([1-9]\d{0,}))(\.\d{0,})?)?$/,
    validNumber: /^-?((0(\.\d+)?)|([1-9]\d{0,}(\.\d+)?))$/,
    allowed: /-?((0|([1-9]\d{0,}))(\.\d{0,})?)?/,
  };

  const handleSliderChange = (event, value) => {
    setInput(value);
    onValid(event, value);
  };

  const handleInputChange = (event) => {
    const valueString = event.target.value;
    if (valueString.match(regex.validNumber)) {
      let value = Number(valueString);
      if (value >= min && value <= max) {
        onValid(event, value);
        setInput(valueString);
        return;
      }
    }
    // if (valueString.match(regex.stricAllowed)) {
    //   setInput(valueString);
    // }
    // if (valueString.match(regex.validSymbols)) {
    setInput(valueString);
    // }
  };

  const handleBlur = (event) => {
    const valueString = event.target.value;
    if (valueString.match(regex.validNumber)) {
      let value = Number(valueString);
      value = clamp(value, min, max);
      onValid(event, value);
      setInput(value);
      return;
    }
  };

  return (
    <>
      <Typography id={`${name}-input`}>{name}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          aria-labelledby={`${name}-input`}
        ></Slider>
        <TextField
          sx={{ width: '150px' }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            'aria-labelledby': `${name}-input`,
          }}
          onBlur={handleBlur}
          onChange={handleInputChange}
          size="small"
          value={inputString}
        />
      </Stack>
    </>
  );
}
