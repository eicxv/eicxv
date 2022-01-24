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
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${props.theme.colors.gray6}`,
  borderRadius: props.theme.radiuses.medium,
  '&:hover': {
    backgroundColor: props.theme.colors.gray4,
    borderColor: props.theme.colors.gray8,
  },
  '&[data-state=on]': {
    backgroundColor: props.theme.colors.gray5,
    color: props.theme.colors.gray12,
    borderColor: props.theme.colors.gray7,
    '&:hover': {
      backgroundColor: props.theme.colors.gray6,
      borderColor: props.theme.colors.gray9,
    },
  },
  '&:focus-visible': {
    boxShadow: `0 0 0 2px ${props.theme.colors.gray12}`,
  },
}));

export const Toggle = StyledToggle;
