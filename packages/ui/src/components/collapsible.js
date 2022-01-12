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
  width: 300,
  backgroundColor: props.theme.backgroundFaded,
}));

const StyledTrigger = styled(CollapsiblePrimitive.Trigger)((props) => ({
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
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

  '&[data-state="open"]': {
    animation: `${slideDown} 200ms ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 200ms ease-out`,
  },
}));

const StyledContentText = styled.div((props) => ({
  padding: '15px 20px',
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
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  )
);
