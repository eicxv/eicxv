import React, { useState, useRef } from 'react';

import { clamp } from '@eicxv/utility/src/generic';

import { TextField, Flex, Slider, Typography } from '@eicxv/ui';

export default function Control({ name, min, max, step, value, onValidValue }) {
  const [inputString, setInput] = useState(value);
  const prevValueRef = useRef(null);
  if (value !== prevValueRef.current) {
    if (value !== Number(inputString)) {
      setInput(value.toFixed(4));
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
    setInput(value[0].toFixed(4));
    onValidValue(value[0]);
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
    <Flex direction="row" align="center" justify="stretch" gap={2}>
      <Typography
        css={(theme) => ({
          minWidth: '9ch',
        })}
        id={`${name}-input`}
      >
        {name}
      </Typography>
      <Slider
        css={(theme) => ({
          flexGrow: 1,
        })}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handleSliderChange}
        aria-labelledby={`${name}-input`}
      ></Slider>
      <TextField
        css={(theme) => ({
          minWidth: '9ch',
        })}
        aria-labelledby={`${name}-input`}
        onBlur={handleBlur}
        onChange={handleInputChange}
        value={inputString}
      />
    </Flex>
  );
}
