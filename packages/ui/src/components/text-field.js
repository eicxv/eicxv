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
    fontVariantNumeric: 'tabular-nums',

    // Custom
    backgroundColor: 'transparent',
    border: `1px solid ${theme.colors.gray6}`,
    borderRadius: theme.radiuses.medium,
    color: colors.text,
    fontVariantNumeric: 'tabular-nums',
    fontFamily: theme.fonts.default,
    fontSize: theme.fontSizes[2],
    padding: space[2],

    '&:hover': {
      borderColor: colors.gray8,
    },
    '&:focus': {
      borderColor: colors.gray12,
    },
    '&::placeholder': {
      color: colors.gray11,
    },
    '&:disabled': {
      pointerEvents: 'none',
      color: colors.textFaded,
      cursor: 'not-allowed',
      '&::placeholder': {
        color: colors.textExtraFaded,
      },
    },
  };
});
