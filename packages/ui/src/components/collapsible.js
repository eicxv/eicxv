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

const StyledCollapsible = styled(CollapsiblePrimitive.Root)((props) => ({
  borderRadius: 6,
  backgroundColor: props.theme.backgroundFaded,
}));

const StyledTrigger = styled(CollapsiblePrimitive.Trigger)((props) => ({
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: `${props.theme.space[2]} ${props.theme.space[3]}`,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  width: '100%',
  lineHeight: 1,
  color: props.theme.colors.text,
  '&[data-state="closed"]': { backgroundColor: props.theme.colors.background },
  '&[data-state="open"]': { backgroundColor: props.theme.colors.background },
  '&:hover': { backgroundColor: props.theme.colors.backgroundFaded },
}));

const StyledContent = styled(CollapsiblePrimitive.Content)((props) => ({
  overflow: 'hidden',
  fontSize: 15,
  color: props.theme.colors.text,
  backgroundColor: props.theme.colors.backgroundFaded,
  padding: `0 ${props.theme.space[3]}`,

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
