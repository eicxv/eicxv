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
    "gatsby-plugin-linaria",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1920,
              quality: 95,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
  ],
};
