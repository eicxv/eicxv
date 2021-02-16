var visit = require("unist-util-visit");

module.exports = attacher;

function attacher() {
  return transformer;

  function transformer(tree, file) {
    visit(tree, "element", visitor);
    function visitor(node, index, parent) {
      if (node.tagName !== "img") {
        return;
      }
      if (node.properties.title === undefined) {
        return;
      }
      let args = node.properties.title.split("|");
      if (args.length <= 1) {
        return;
      }
      node.properties.title = args[0];
      let style = args[1].split("=").join(":");
      if (style.charAt(style.length - 1) !== ";") {
        style += ";";
      }
      node.properties.style = "object-fit:contain;" + node.properties.style;
      parent.properties.style = style + parent.properties.style;
    }
  }
}
