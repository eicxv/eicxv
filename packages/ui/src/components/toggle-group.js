import styled from '@emotion/styled';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root)((props) => ({
  display: 'inline-flex',
}));

const StyledItem = styled(ToggleGroupPrimitive.Item)((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    backgroundColor: 'transparent',
    color: theme.colors.gray11,
    padding: theme.space[2],
    display: 'flex',
    fontSize: theme.fontSizes[3],
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.colors.gray6}`,
    borderRight: 'none',
    cursor: 'pointer',
    marginLeft: 0,
    '&:first-of-type': {
      borderTopLeftRadius: theme.radiuses.medium,
      borderBottomLeftRadius: theme.radiuses.medium,
    },
    '&:last-child': {
      marginLeft: 0,
      borderRight: `1px solid ${theme.colors.gray6}`,
      borderTopRightRadius: theme.radiuses.medium,
      borderBottomRightRadius: theme.radiuses.medium,
    },

    '&[data-state=on]': {
      backgroundColor: theme.colors.gray5,
      color: theme.colors.gray12,
      borderColor: theme.colors.gray7,
    },
    '&[data-state=on] + &': {
      borderLeftColor: theme.colors.gray7,
    },

    '&[data-state=off]:hover': {
      backgroundColor: theme.colors.gray4,
      borderColor: theme.colors.gray8,
    },
    '&[data-state=off]:hover + &': {
      borderLeftColor: theme.colors.gray8,
    },

    '&[data-state=on]:hover': {
      backgroundColor: theme.colors.gray6,
      borderColor: theme.colors.gray9,
    },
    '&[data-state=on]:hover + &': {
      borderLeftColor: theme.colors.gray9,
    },
    '&:focus-visible': {
      position: 'relative',
      boxShadow: `0 0 0 2px ${theme.colors.gray12}`,
    },
  };
});

// StyledToggleGroup.defaultProps.rovingFocus = false;
StyledToggleGroup.defaultProps = { rovingFocus: false };

export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupItem = StyledItem;
