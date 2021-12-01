import NextLink from 'next/link';
import { Grid, Link } from '@mui/material';

import Button from './button';

export default function Navigation() {
  const links = [
    { href: '/journal', label: 'Journal' },
    { href: '/', label: <>Einar&nbsp;Persson</> },
    { href: '/about', label: 'About' },
  ];

  return (
    <Grid
      component="header"
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ py: 3, mb: 3 }}
    >
      {links.map((link) => (
        <NextLink href={link.href} key={link.href} passHref>
          <Button component={Link} sx={{ fontSize: 16, fontWeight: 400 }}>
            {link.label}
          </Button>
        </NextLink>
      ))}
    </Grid>
  );
}
