import styled from '@emotion/styled';
import * as TogglePrimitive from '@radix-ui/react-toggle';

const StyledToggle = styled(TogglePrimitive.Root)((props) => ({
  all: 'unset',
  backgroundColor: props.theme.colors.background,
  color: props.theme.colors.textFaded,
  padding: props.theme.space[2],
  display: 'flex',
  fontSize: props.theme.fontSizes[3],
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px solid ${props.theme.colors.textExtraFaded}`,
  '&:hover': { backgroundColor: props.theme.colors.backgroundFaded },
  '&[data-state=on]': {
    backgroundColor: props.theme.colors.backgroundFaded,
    color: props.theme.colors.text,
  },
  '&:focus-visible': {
    outline: `2px solid ${props.theme.colors.text}`,
  },
}));

export const Toggle = StyledToggle;
