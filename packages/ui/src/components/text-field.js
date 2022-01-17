import styled from '@emotion/styled';

export const TextField = styled.input((props) => {
  const theme = props.theme;
  const { colors, space } = theme;
  return {
    // Reset
    appearance: 'none',
    borderWidth: '0',
    boxSizing: 'border-box',
    margin: '0',
    outline: 'none',
    padding: '0',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    '&::before': {
      boxSizing: 'border-box',
    },
    '&::after': {
      boxSizing: 'border-box',
    },
    fontVariantNumeric: 'tabular-nums',

    // Custom
    backgroundColor: colors.background,
    boxShadow: `inset 0 0 0 1px ${colors.text}`,
    color: colors.text,
    fontVariantNumeric: 'tabular-nums',
    fontFamily: theme.fonts.default,
    fontSize: theme.fontSizes[2],
    padding: space[2],

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${colors.text}`,
    },
    '&:focus': {
      boxShadow: `inset 0px 0px 0px 2px ${colors.text}, 0px 0px 0px 1px ${colors.text}`,
    },
    '&::placeholder': {
      color: colors.textFaded,
    },
    '&:disabled': {
      boxShadow: `inset 0 0 0 1px ${colors.textExtraFaded}`,
      pointerEvents: 'none',
      backgroundColor: colors.backgroundFaded,
      color: colors.textFaded,
      cursor: 'not-allowed',
      '&::placeholder': {
        color: colors.textExtraFaded,
      },
    },
  };
});
