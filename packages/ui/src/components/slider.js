import React, { forwardRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { styled } from '@stitches/react';

const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',

  '&[data-orientation="horizontal"]': {
    height: 20,
    width: '100%',
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: '$textExtraFaded',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: '$text',
  borderRadius: '9999px',
  height: '100%',
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  '&[data-orientation="horizontal"]': { width: 10, height: 20 },
  '&[data-orientation="vertical"]': { width: 20, height: 10 },
  backgroundColor: '$text',
  border: '2px solid $background',
  '&:hover': { backgroundColor: '$textFaded' },
  '&:focus-visible': {
    outline: '4px solid $colors$text',
    borderWidth: '4px',
  },
});

export const Slider = React.forwardRef((props, forwardedRef) => {
  const value = props.value || props.defaultValue;

  return (
    <StyledSlider {...props} ref={forwardedRef}>
      <StyledTrack>
        <StyledRange />
      </StyledTrack>
      {value.map((_, i) => (
        <StyledThumb key={i} />
      ))}
    </StyledSlider>
  );
});
