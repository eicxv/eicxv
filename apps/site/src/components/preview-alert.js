import Link from 'next/link';

export default function PreviewAlert() {
  return (
    <div
      css={(theme) => ({
        backgroundColor: theme.colors.warning,
        textAlign: 'center',
        padding: `${theme.space[3]} 0`,
        borderBottom: 'solid thin black',
      })}
    >
      This is a preview of unpublished content.{' '}
      <Link href="/api/exit-preview">
        <a>Click here</a>
      </Link>{' '}
      to leave preview mode.
    </div>
  );
}
