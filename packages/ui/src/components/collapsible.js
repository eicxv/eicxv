import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
});

const StyledTrigger = styled(CollapsiblePrimitive.Trigger)((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '100%',
    padding: `${theme.space[2]} ${theme.space[3]}`,
    lineHeight: 1,
    color: theme.colors.gray12,

    backgroundColor: theme.colors.gray3,
    border: `1px solid ${theme.colors.gray6}`,
    borderRadius: theme.radiuses.medium,
    transition: 'border-radius 25ms ease 175ms',

    '&[data-state="open"]': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: 'border-radius 25ms',
    },
    '&:hover': {
      backgroundColor: theme.colors.gray5,
      borderColor: theme.colors.gray8,
    },
  };
});

const StyledCollapsible = styled(CollapsiblePrimitive.Root)((props) => ({}));

const StyledContent = styled(CollapsiblePrimitive.Content)((props) => ({
  overflow: 'hidden',
  color: props.theme.colors.gray12,
  backgroundColor: 'transparent',
  padding: `0 ${props.theme.space[3]}`,
  borderBottomLeftRadius: props.theme.radiuses.medium,
  borderBottomRightRadius: props.theme.radiuses.medium,
  border: `1px solid ${props.theme.colors.gray6}`,
  borderTop: 'none',

  '&[data-state="open"]': {
    animation: `${slideDown} 200ms ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 200ms ease-out`,
  },
}));

export const Collapsible = StyledCollapsible;
export const CollapsibleTrigger = forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
    </StyledTrigger>
  )
);
export const CollapsibleContent = forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      {children}
    </StyledContent>
  )
);
