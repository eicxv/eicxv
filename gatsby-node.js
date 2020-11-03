const path = require("path");

const createPosts = (createPage, edges) => {
  edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.jsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    const { edges } = data.allMdx;
    createPosts(actions.createPage, edges);
  });

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const slug = path.posix.join(`/journal`, parent.name);
    actions.createNodeField({
      name: "slug",
      node,
      value: slug,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};
