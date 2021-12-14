import Link from 'next/link';
import { Box } from '@eicxv/ui';

export default function PostPreview({ slug, title, excerpt }) {
  return (
    <Box css={(theme) => ({ margin: `${theme.space[3]} 0` })}>
      <Link href={`/journal/${slug}`} passHref>
        <a
          css={(theme) => ({
            fontSize: theme.fontSizes[5],
            color: theme.colors.text,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          })}
        >
          <Box>{title}</Box>
          {excerpt ? (
            <Box css={(theme) => ({ fontSize: theme.fontSizes[3] })}>
              {excerpt}
            </Box>
          ) : null}
        </a>
      </Link>
    </Box>
  );
}
