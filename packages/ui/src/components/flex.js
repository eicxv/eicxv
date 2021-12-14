import styled from '@emotion/styled';

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const wrapMap = {
  noWrap: 'nowrap',
  wrap: 'wrap',
  wrapReverse: 'wrap-reverse',
};

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const directionMap = {
  row: 'row',
  column: 'column',
  rowReverse: 'row-reverse',
  columnReverse: 'column-reverse',
};

export const Flex = styled.div((props) => {
  return {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: justifyMap[props.justify],
    flexWrap: wrapMap[props.wrap],
    alignItems: alignMap[props.align],
    flexDirection: directionMap[props.direction],
    gap: props.theme.space[props.gap],
  };
});

Flex.defaultProps = {
  direction: 'row',
  align: 'stretch',
  justify: 'start',
  wrap: 'noWrap',
  gap: 0,
};
