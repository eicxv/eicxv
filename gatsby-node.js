require("dotenv").config();
const path = require(`path`);
const { gql, GraphQLClient } = require("graphql-request");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  cache,
}) => {
  data = await requestPostData(cache);
  createMarkdownNodes(data, actions, createNodeId, createContentDigest);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  createSlugField(node, getNode, actions);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.jsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

function createSlug(dir, fileName, trailingSlash = true) {
  let i = fileName.lastIndexOf(".");
  i = i === -1 ? fileName.length : i;
  fileName = fileName.substring(0, i);
  return path.posix.join("/", dir, fileName, trailingSlash ? "/" : "");
}

function createMarkdownNodes(data, actions, createNodeId, createContentDigest) {
  const posts = data.repository.object.entries.find((p) => p.name === "posts");

  for (let entry of posts.object.entries) {
    let name = entry.name;
    let content = entry.object.text;

    actions.createNode({
      name,
      slug: createSlug("journal", name),
      id: createNodeId(`GithubMarkdown-${name}`),
      internal: {
        type: "GithubMarkdown",
        content,
        mediaType: "text/markdown",
        contentDigest: createContentDigest(content),
      },
    });
  }
}

async function requestPostData(cache) {
  const cacheKey = "github-journal-data";
  let obj = await cache.get(cacheKey);
  if (!obj || Date.now() > obj.lastChecked + 3600000) {
    obj = { data: await runGithubRequest() };
  }
  obj.lastChecked = Date.now();
  await cache.set(cacheKey, obj);
  return obj.data;
}

function runGithubRequest() {
  const endpoint = "https://api.github.com/graphql";
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
  });
  const query = gql`
    query RepoFiles($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        object(expression: "master:") {
          ... on Tree {
            entries {
              name
              object {
                ... on Tree {
                  entries {
                    name
                    object {
                      ... on Blob {
                        id
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = { owner: "eicxv", name: "journal" };
  return client.request(query, variables);
}

function createSlugField(node, getNode, actions) {
  if (node.internal.type === "MarkdownRemark") {
    let sourceNode = getNode(node.parent);
    if (sourceNode.internal.type === "GithubMarkdown") {
      actions.createNodeField({
        node,
        name: "slug",
        value: sourceNode.slug,
      });
    }
  }
}
