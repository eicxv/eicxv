import styled from '@emotion/styled';

const variants = {
  solid: (props) => {
    const theme = props.theme;
    return {
      color: theme.colors.gray1,
      backgroundColor: theme.colors.gray12,
      border: `1px solid ${theme.colors.gray12}`,
      borderLeftColor: theme.colors.gray1,
      borderRight: 'none',
      '&:first-of-type': {
        borderLeftColor: theme.colors.gray12,
        borderTopLeftRadius: theme.radiuses.medium,
        borderBottomLeftRadius: theme.radiuses.medium,
      },
      '&:last-child': {
        borderRight: `1px solid ${theme.colors.gray12}`,
        borderTopRightRadius: theme.radiuses.medium,
        borderBottomRightRadius: theme.radiuses.medium,
      },
      '&:hover': {
        color: theme.colors.gray12,
        backgroundColor: theme.colors.gray1,
        borderColor: theme.colors.gray8,
      },
      '&:hover + &': {
        borderLeftColor: theme.colors.gray8,
      },
      '&:active': {
        backgroundColor: theme.colors.gray3,
      },
      '&:focus-visible': {
        zIndex: 10,
        boxShadow: `0 0 0 2px ${'red'}`,
      },
    };
  },
  outline: (props) => {
    const theme = props.theme;
    return {
      color: theme.colors.gray12,
      border: `1px solid ${theme.colors.gray6}`,
      borderRight: 'none',
      '&:first-of-type': {
        borderTopLeftRadius: theme.radiuses.medium,
        borderBottomLeftRadius: theme.radiuses.medium,
      },
      '&:last-child': {
        borderRight: `1px solid ${theme.colors.gray6}`,
        borderTopRightRadius: theme.radiuses.medium,
        borderBottomRightRadius: theme.radiuses.medium,
      },
      '&:hover': {
        backgroundColor: theme.colors.gray4,
        borderColor: theme.colors.gray8,
      },
      '&:hover + &': {
        borderLeftColor: theme.colors.gray8,
      },
      '&:active': {
        backgroundColor: theme.colors.gray6,
        borderColor: theme.colors.gray9,
      },
      '&:focus-visible': {
        position: 'relative',
        boxShadow: `0 0 0 2px ${theme.colors.gray12}`,
      },
    };
  },
};

const StyledButtonGroupItem = styled.button((props) => {
  const theme = props.theme;
  return {
    all: 'unset',
    backgroundColor: 'transparent',
    padding: theme.space[2],
    display: 'flex',
    fontSize: theme.fontSizes[3],
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',

    ...variants[props.variant](props),
  };
});

const StyledButtonGroup = styled.div((props) => {
  return {
    display: 'inline-flex',
  };
});

StyledButtonGroupItem.defaultProps = { variant: 'outline' };

export const ButtonGroup = StyledButtonGroup;
export const ButtonGroupItem = StyledButtonGroupItem;
