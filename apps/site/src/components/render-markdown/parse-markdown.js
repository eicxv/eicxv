import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { removePosition } from 'unist-util-remove-position';
import transformDirectives from './transform-directives';
import getAndDeleteFrontmatter from './get-and-delete-frontmatter';
import { getMap } from '../../lib/contentful-asset-map';
import glsl from 'highlight.js/lib/languages/glsl';

const languages = { glsl };

export async function markdownToHast(markdown, preview) {
  const assetMap = await getMap(preview);
  const toMdast = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkDirective)
    .use(transformDirectives, assetMap)
    .use(remarkMath)
    .freeze();

  const toHast = unified()
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeHighlight, { languages })
    .freeze();

  let mdast = toMdast.parse(markdown);
  mdast = toMdast.runSync(mdast);
  let frontmatter = getAndDeleteFrontmatter(mdast);
  let hast = toHast.runSync(mdast);
  hast = removePosition(hast, true);
  return { frontmatter, hast };
}

export function extractFrontmatter(markdown) {
  const toMdast = unified().use(remarkParse).use(remarkFrontmatter).freeze();

  let mdast = toMdast.parse(markdown);
  mdast = toMdast.runSync(mdast);
  let frontmatter = getAndDeleteFrontmatter(mdast);
  return frontmatter;
}
