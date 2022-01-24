import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Box } from './box';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root)((props) => ({}));

const StyledHeader = styled(AccordionPrimitive.Header)((props) => ({
  all: 'unset',
  display: 'flex',
}));

const StyledTrigger = styled(AccordionPrimitive.Trigger)((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 1,
    padding: `${theme.space[2]} ${theme.space[3]}`,
    backgroundColor: theme.colors.gray3,
  };
});

const StyledContent = styled(AccordionPrimitive.Content)((props) => {
  const theme = props.theme;
  return {
    overflow: 'hidden',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 1px 0px 0px ${theme.colors.gray6}`,

    '&[data-state="open"]': {
      animation: `${slideDown} 200ms ease`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 200ms ease`,
    },
  };
});

const StyledItem = styled(AccordionPrimitive.Item)((props) => {
  const theme = props.theme;
  return {
    overflow: 'hidden',
    border: `1px solid ${theme.colors.gray6}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:first-of-type': {
      borderTopLeftRadius: theme.radiuses.medium,
      borderTopRightRadius: theme.radiuses.medium,
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.radiuses.medium,
      borderBottomRightRadius: theme.radiuses.medium,
    },
    '&:hover': {
      borderColor: theme.colors.gray8,
    },
    [`&:hover ${StyledContent}`]: {
      boxShadow: `inset 0px 1px 0px 0px ${theme.colors.gray8}`,
    },

    [`&[data-state="closed"]:hover + &`]: {
      borderTopColor: theme.colors.gray8,
    },

    '&:focus-within': {
      position: 'relative',
      zIndex: 1,
    },
  };
});

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
      <Box css={{ paddingTop: 1 }}>{children}</Box>
    </StyledContent>
  )
);
