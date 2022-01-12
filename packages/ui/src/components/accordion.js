import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root)((props) => ({
  borderRadius: 6,
  backgroundColor: props.theme.backgroundFaded,
}));

const StyledItem = styled(AccordionPrimitive.Item)((props) => ({
  overflow: 'hidden',

  border: `solid 2px ${props.theme.colors.backgroundFaded}`,
  borderBottom: 'none',

  '&:first-child': {
    marginTop: 0,
  },
  '&:last-child': {
    borderBottom: `solid 2px ${props.theme.colors.backgroundFaded}`,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
  },
}));

const StyledHeader = styled(AccordionPrimitive.Header)((props) => ({
  all: 'unset',
  display: 'flex',
}));

const StyledTrigger = styled(AccordionPrimitive.Trigger)((props) => ({
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

const StyledContent = styled(AccordionPrimitive.Content)((props) => ({
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

export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
      </StyledTrigger>
    </StyledHeader>
  )
);
export const AccordionContent = forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  )
);
