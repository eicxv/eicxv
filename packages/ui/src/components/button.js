import styled from '@emotion/styled';

const StyledButton = styled.button((props) => {
  const theme = props.theme;
  return {
    // reset
    all: 'unset',
    alignItems: 'center',
    boxSizing: 'border-box',
    userSelect: 'none',
    '&::before': {
      boxSizing: 'border-box',
    },
    '&::after': {
      boxSizing: 'border-box',
    },
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    lineHeight: '1',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',

    // styles
    color: theme.colors.text,
    fontFamily: theme.fonts.default,
    fontWeight: theme.fontWeights.heading,
    backgroundColor: theme.colors.background,
    textTransform: 'uppercase',
    border: `2px solid ${theme.colors.background}`,
    padding: `${theme.space[2]} ${theme.space[3]}`,
    '&:hover': {
      color: theme.colors.background,
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.text,
    },
    '&:active': {
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.text,
    },
    '&:focus-visible': {
      outline: `5px solid ${theme.colors.text}`,
    },
  };
});

export const Button = StyledButton;

// export const Button = forwardRef(({ children, ...props }, forwardedRef) => {
//   return (
//     <StyledButton {...props} ref={forwardedRef}>
//       {children}
//     </StyledButton>
//   );
// });
