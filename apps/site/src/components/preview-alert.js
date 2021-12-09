import Link from 'next/link';
import { css, jsx } from '@emotion/react';

// ${theme.palette.colors.warning.main}

export default function PreviewAlert() {
  return (
    <div
      css={(theme) => css`
        background-color: yellow;
        text-align: center;
        padding: 1rem 0;
        border-bottom: solid black thin;
      `}
    >
      This is a preview of unpublished content.
      <Link href="/api/exit-preview">
        <a>Click here</a>
      </Link>{' '}
      to leave preview mode.
    </div>
  );
}
