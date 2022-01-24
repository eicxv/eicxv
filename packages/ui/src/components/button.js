import styled from '@emotion/styled';

const variants = {
  solid: (props) => {
    const theme = props.theme;
    return {
      color: theme.colors.gray1,
      backgroundColor: theme.colors.gray12,
      border: `1px solid ${theme.colors.gray12}`,
      '&:hover': {
        color: theme.colors.gray12,
        backgroundColor: theme.colors.gray1,
        borderColor: theme.colors.gray8,
      },
      '&:active': {
        backgroundColor: theme.colors.gray3,
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${props.theme.colors.gray12}`,
      },
    };
  },
  outline: (props) => {
    const theme = props.theme;
    return {
      color: theme.colors.gray12,
      border: `1px solid ${theme.colors.gray6}`,
      '&:hover': {
        borderColor: theme.colors.gray8,
      },
      '&:active': {
        backgroundColor: theme.colors.gray3,
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${props.theme.colors.gray12}`,
      },
    };
  },
  text: (props) => {
    const theme = props.theme;
    return {
      color: theme.colors.gray12,
      '&:hover': {
        backgroundColor: theme.colors.gray2,
      },
      '&:active': {
        backgroundColor: theme.colors.gray3,
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${props.theme.colors.gray12}`,
      },
    };
  },
};

const StyledButton = styled.button((props) => {
  const theme = props.theme;
  return {
    // reset
    all: 'unset',
    alignItems: 'center',
    boxSizing: 'border-box',
    userSelect: 'none',
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    lineHeight: '1',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',

    // styles
    cursor: 'pointer',
    borderRadius: theme.radiuses.medium,
    padding: `${theme.space[2]} ${theme.space[3]}`,
    transition: 'all 150ms ease',

    ...variants[props.variant](props),
  };
});

StyledButton.defaultProps = { variant: 'outline' };
export const Button = StyledButton;
