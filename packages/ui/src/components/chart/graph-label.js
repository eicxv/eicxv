export default function GraphLabel({
  range = [0, 100],
  variant = 'x',
  children,
  transform,
  ...other
}) {
  const x = (range[0] + range[1]) / 2;
  const y = variant === 'x' ? 40 : -40;
  const rot = variant === 'x' ? 0 : -90;
  transform = transform || '';
  return (
    <text
      transform={`rotate(${rot}) translate(${x} ${y}) ${transform}`}
      textAnchor="middle"
      {...other}
    >
      {children}
    </text>
  );
}
