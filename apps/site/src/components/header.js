import NextLink from 'next/link';
import { styled, css } from '../../stitches.config';
import { Button, Grid, Flex } from '@eicxv/ui';

const Container = styled(Flex, {
  width: '100%',
});

export default function Navigation() {
  const links = [
    { href: '/journal', label: 'Journal' },
    { href: '/', label: <>Einar&nbsp;Persson</> },
    { href: '/about', label: 'About' },
  ];

  return (
    <Flex
      as="header"
      direction="row"
      justify="around"
      align="center"
      className={css({ py: '$3', mb: '$4' })()}
    >
      {links.map((link) => (
        <NextLink href={link.href} key={link.href} passHref>
          <Button as="a">{link.label}</Button>
        </NextLink>
      ))}
    </Flex>
  );
}
