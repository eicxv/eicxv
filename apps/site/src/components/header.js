import NextLink from 'next/link';
import { Button, Flex } from '@eicxv/ui';

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
      css={(theme) => ({
        padding: `${theme.space[3]} 0`,
      })}
    >
      {links.map((link) => (
        <NextLink href={link.href} key={link.href} passHref>
          <Button as="a">{link.label}</Button>
        </NextLink>
      ))}
    </Flex>
  );
}
