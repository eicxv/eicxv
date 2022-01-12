import { forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from '@emotion/styled';

const StyledSwitch = styled(SwitchPrimitive.Root)((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    width: 48,
    height: 25,
    backgroundColor: theme.colors.textExtraFaded,
    position: 'relative',
    '&:focus-visible': {
      outline: `4px solid ${theme.colors.text}`,
      outlineOffset: '3px',
    },
    '&[data-state="checked"]': { backgroundColor: theme.colors.text },
    '&:first-of-type': {
      '&:hover': {
        backgroundColor: theme.colors.backgroundFaded,
        '&[data-state="checked"]': {
          backgroundColor: theme.colors.textFaded,
        },
      },
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      width: 48,
      height: 48,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };
});

const StyledThumb = styled(SwitchPrimitive.Thumb)((props) => {
  const theme = props.theme;
  return {
    display: 'block',
    width: 19,
    height: 19,
    backgroundColor: theme.colors.background,
    margin: '3px',
    transition: 'transform 50ms',
    willChange: 'transform',
    '&[data-state="checked"]': {
      transform: 'translateX(23px)',
      borderColor: theme.colors.text,
    },
  };
});

export const Switch = forwardRef((props, forwardedRef) => {
  const value = props.value || props.defaultValue;

  return (
    <StyledSwitch {...props} ref={forwardedRef}>
      <StyledThumb />
    </StyledSwitch>
  );
});
