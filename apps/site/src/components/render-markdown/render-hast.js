import React from 'react';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';
import * as components from './components';

const processor = unified().use(rehypeReact, {
  createElement: React.createElement,
  Fragment: React.Fragment,
  components,
});

export default function RenderHast({ hast }) {
  return <>{processor.stringify(hast)}</>;
}
