import yaml from 'js-yaml';

export default function getAndDeleteFrontmatter(mdast) {
  const frontmatterNode = mdast.children?.[0];
  if (frontmatterNode?.type !== 'yaml') {
    return {};
  }
  mdast.children.splice(0, 1);
  const frontmatter = yaml.load(frontmatterNode.value, {
    schema: yaml.CORE_SCHEMA,
  });
  return frontmatter;
}
