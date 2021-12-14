import React, { forwardRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import styled from '@emotion/styled';

const StyledSlider = styled(SliderPrimitive.Root)((props) => ({
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
}));

const StyledTrack = styled(SliderPrimitive.Track)((props) => ({
  backgroundColor: props.theme.colors.textExtraFaded,
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
}));

const StyledRange = styled(SliderPrimitive.Range)((props) => ({
  position: 'absolute',
  backgroundColor: props.theme.colors.text,
  borderRadius: '9999px',
  height: '100%',
}));

const StyledThumb = styled(SliderPrimitive.Thumb)((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    display: 'block',
    '&[data-orientation="horizontal"]': { width: 10, height: 20 },
    '&[data-orientation="vertical"]': { width: 20, height: 10 },
    backgroundColor: theme.colors.text,
    border: `2px solid ${theme.colors.background}`,
    '&:hover': { backgroundColor: theme.colors.textFaded },
    '&:focus-visible': {
      outline: `4px solid ${theme.colors.text}`,
      borderWidth: '4px',
    },
  };
});

export const Slider = forwardRef((props, forwardedRef) => {
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
