module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: `https://eicxv.com`,
    title: `Einar Persson · eicxv`,
    description: `I write about my projects in programming, art and architecture. Guides and essays on design, creative coding, generative art and more.`,
    author: `Einar Persson`,
    keywords: [`programming`, `art`, `architecture`],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/`,
        name: "content",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/assets/`,
        name: "assets",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-mdx-images",
            options: {
              elementName: "Image",
              fluid: {
                quality: 95,
              },
              output: {
                base64: false,
              },
            },
          },
        ],
        remarkPlugins: [require("remark-math")],
        rehypePlugins: [require("rehype-katex")],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
  ],
};
