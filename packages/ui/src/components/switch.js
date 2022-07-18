import { forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from '@emotion/styled';

const StyledThumb = styled(SwitchPrimitive.Thumb)((props) => {
  const theme = props.theme;
  return {
    display: 'block',
    width: 23,
    height: 23,
    borderRadius: theme.radiuses.medium,
    backgroundColor: theme.colors.gray2,
    border: `1px solid ${theme.colors.gray11}`,
    transition: 'transform 50ms',
    willChange: 'transform',
    '&[data-state="checked"]': {
      transform: 'translateX(23px)',
    },
  };
});

const StyledSwitch = styled(SwitchPrimitive.Root)((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    width: 48,
    height: 25,
    backgroundColor: theme.colors.gray6,
    borderRadius: theme.radiuses.medium,
    transition: 'background-color 50ms',
    position: 'relative',
    cursor: 'pointer',
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.colors.gray12}`,
    },
    '&[data-state="checked"]': {
      backgroundColor: theme.colors.gray11,
    },
    [`&:hover ${StyledThumb}`]: {
      backgroundColor: theme.colors.gray7,
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

export const Switch = forwardRef((props, forwardedRef) => {
  const value = props.value || props.defaultValue;

  return (
    <StyledSwitch {...props} ref={forwardedRef}>
      <StyledThumb />
    </StyledSwitch>
  );
});
