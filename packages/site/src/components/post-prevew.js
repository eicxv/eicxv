import NextLink from 'next/link';
import { Box, Typography, Link } from '@mui/material';

export default function PostPreview({ slug, title, excerpt }) {
  return (
    <Box my={2}>
      <NextLink href={`/journal/${slug}`} passHref>
        <Link color="inherit" underline="hover">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          {excerpt ? <Typography variant="body1">{excerpt}</Typography> : null}
        </Link>
      </NextLink>
    </Box>
  );
}
