import React from 'react';
import NextImage from 'next/image';

export default function Image({ children, ...props }) {
  const caption = React.Children.count(children) !== 0;
  return (
    <figure>
      <NextImage layout="responsive" {...props} />
      {caption ? <figcaption>{children}</figcaption> : null}
    </figure>
  );
}
