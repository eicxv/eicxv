import React, { forwardRef } from 'react';
import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  // reset
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // styles
  color: '$text',
  fontFamily: '$default',
  fontWeight: '$heading',
  backgroundColor: '$background',
  textTransform: 'uppercase',
  border: '2px solid $background',
  padding: '$2 $3',
  '&:hover': {
    color: '$background',
    borderColor: '$text',
    backgroundColor: '$text',
  },
  '&:active': {
    color: '$text',
    backgroundColor: '$background',
    borderColor: '$text',
  },
  '&:focus-visible': {
    outline: '5px solid $text',
  },
});

export const Button = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledButton {...props} ref={forwardedRef}>
        {children}
      </StyledButton>
    );
  }
);
