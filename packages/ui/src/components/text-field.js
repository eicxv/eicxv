import { styled } from '@stitches/react';

export const TextField = styled('input', {
  // Reset
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  margin: '0',
  outline: 'none',
  padding: '0',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  fontVariantNumeric: 'tabular-nums',

  // Custom
  backgroundColor: '$background',
  boxShadow: 'inset 0 0 0 1px $colors$text',
  color: '$text',
  fontVariantNumeric: 'tabular-nums',
  fontFamily: '$default',
  fontSize: '$2',
  padding: '$2',

  '&:hover': {
    boxShadow: 'inset 0px 0px 0px 2px $colors$text',
  },
  '&:focus': {
    boxShadow:
      'inset 0px 0px 0px 2px $colors$text, 0px 0px 0px 1px $colors$text',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0px 0px 0px 2px $colors$text, 0px 0px 0px 1px $colors$text, inset 0 0 0 100px blue',
    },
  },
  '&::placeholder': {
    color: '$textFaded',
  },
  '&:disabled': {
    boxShadow: 'inset 0 0 0 1px $colors$textExtraFaded',
    pointerEvents: 'none',
    backgroundColor: '$backgroundFaded',
    color: '$textFaded',
    cursor: 'not-allowed',
    '&::placeholder': {
      color: '$textExtraFaded',
    },
  },
});
