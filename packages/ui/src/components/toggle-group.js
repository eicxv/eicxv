import styled from '@emotion/styled';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root)((props) => ({
  display: 'inline-flex',
}));

const StyledItem = styled(ToggleGroupPrimitive.Item)((props) => ({
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
  borderRight: 'none',
  marginLeft: 0,
  '&:last-child': {
    marginLeft: 0,
    borderRight: `2px solid ${props.theme.colors.textExtraFaded}`,
  },
  '&:hover': { backgroundColor: props.theme.colors.backgroundFaded },
  '&[data-state=on]': {
    backgroundColor: props.theme.colors.backgroundFaded,
    color: props.theme.colors.text,
  },
  '&:focus-visible': {
    position: 'relative',
    boxShadow: `0 0 0 2px black`,
  },
}));

export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupItem = StyledItem;
