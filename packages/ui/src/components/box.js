import styled from '@emotion/styled';

export const Box = styled.div((props) => ({
  boxSizing: 'border-box',
  color: props.theme.colors.text,
}));
