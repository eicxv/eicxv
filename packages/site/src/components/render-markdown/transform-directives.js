import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export default function transformDirectives(assetMap) {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        node.attributes = imageTransformer(node, assetMap) ?? node.attributes;
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);
        data.hName = node.name;
        data.hProperties = hast.properties;
      }
    });
  };
}

function imageTransformer(node, assetMap) {
  if (node.name !== 'Image') {
    return null;
  }
  const asset = assetMap.get(node.attributes['content-title']);
  if (asset === undefined) {
    return null;
  }
  const attributes = {
    ...node.attributes,
    src: asset.url,
    width: asset.width,
    height: asset.height,
  };
  delete attributes['content-title'];
  return attributes;
}
