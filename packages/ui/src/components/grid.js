import styled from '@emotion/styled';

const align = {
  start: 'start',
  center: 'center',
  end: 'end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justify =  {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
},
const flow =  {
  row:  'row',
  column:  'column',
  dense:  'dense',
  rowDense:  'row dense',
  columnDense:  'column dense',
},
const columns =  {
  1: 'repeat(1, 1fr)',
  2: 'repeat(2, 1fr)',
  3: 'repeat(3, 1fr)',
  4: 'repeat(4, 1fr)',
},

gap: {
  0: {
    gap: '$0',
  },
  1: {
    gap: '$1',
  },
  2: {
    gap: '$2',
  },
  3: {
    gap: '$3',
  },
  4: {
    gap: '$4',
  },
  5: {
    gap: '$5',
  },
  6: {
    gap: '$6',
  },
  7: {
    gap: '$7',
  },
  8: {
    gap: '$8',
  },
},
gapX: {
  0: {
    columnGap: '$0',
  },
  1: {
    columnGap: '$1',
  },
  2: {
    columnGap: '$2',
  },
  3: {
    columnGap: '$3',
  },
  4: {
    columnGap: '$4',
  },
  5: {
    columnGap: '$5',
  },
  6: {
    columnGap: '$6',
  },
  7: {
    columnGap: '$7',
  },
  8: {
    columnGap: '$8',
  },
},
gapY: {
  0: {
    rowGap: '$0',
  },
  1: {
    rowGap: '$1',
  },
  2: {
    rowGap: '$2',
  },
  3: {
    rowGap: '$3',
  },
  4: {
    rowGap: '$4',
  },
  5: {
    rowGap: '$5',
  },
  6: {
    rowGap: '$6',
  },
  7: {
    rowGap: '$7',
  },
  8: {
    rowGap: '$8',
  },
},

export const Grid = styled.div({
  boxSizing: 'border-box',
  display: 'grid',

  variants: {
    align: {
      start: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    flow: {
      row: {
        gridAutoFlow: 'row',
      },
      column: {
        gridAutoFlow: 'column',
      },
      dense: {
        gridAutoFlow: 'dense',
      },
      rowDense: {
        gridAutoFlow: 'row dense',
      },
      columnDense: {
        gridAutoFlow: 'column dense',
      },
    },
    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
    gap: {
      0: {
        gap: '$0',
      },
      1: {
        gap: '$1',
      },
      2: {
        gap: '$2',
      },
      3: {
        gap: '$3',
      },
      4: {
        gap: '$4',
      },
      5: {
        gap: '$5',
      },
      6: {
        gap: '$6',
      },
      7: {
        gap: '$7',
      },
      8: {
        gap: '$8',
      },
    },
    gapX: {
      0: {
        columnGap: '$0',
      },
      1: {
        columnGap: '$1',
      },
      2: {
        columnGap: '$2',
      },
      3: {
        columnGap: '$3',
      },
      4: {
        columnGap: '$4',
      },
      5: {
        columnGap: '$5',
      },
      6: {
        columnGap: '$6',
      },
      7: {
        columnGap: '$7',
      },
      8: {
        columnGap: '$8',
      },
    },
    gapY: {
      0: {
        rowGap: '$0',
      },
      1: {
        rowGap: '$1',
      },
      2: {
        rowGap: '$2',
      },
      3: {
        rowGap: '$3',
      },
      4: {
        rowGap: '$4',
      },
      5: {
        rowGap: '$5',
      },
      6: {
        rowGap: '$6',
      },
      7: {
        rowGap: '$7',
      },
      8: {
        rowGap: '$8',
      },
    },
  },
});
