import React, { useState, useRef } from 'react';

import { clamp } from '@eicxv/utility/src/generic';

import { TextField, Flex, Slider, Typography } from '@eicxv/ui';

export default function Control({ name, min, max, step, value, onValidValue }) {
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

  const handleSliderChange = (value) => {
    setInput(value);
    onValidValue(value);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleBlur = (event) => {
    const valueString = event.target.value;
    if (valueString.match(regex.validNumber)) {
      let value = Number(valueString);
      value = clamp(value, min, max);
      onValidValue(value);
      setInput(value);
      return;
    }
    setInput(value);
  };

  return (
    <Flex direction="row" align="center" gap={2}>
      <Typography id={`${name}-input`}>{name}</Typography>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleSliderChange}
        aria-labelledby={`${name}-input`}
      ></Slider>
      <TextField
        aria-labelledby={`${name}-input`}
        onBlur={handleBlur}
        onChange={handleInputChange}
        value={inputString}
      />
    </Flex>
  );
}
