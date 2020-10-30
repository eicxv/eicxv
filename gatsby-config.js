module.exports = {
  siteMetadata: {
    title: `Einar Persson · eicxv`,
    description: `I write about my projects in programming, art and architecture. Guides and essays on design, creative coding, generative art and more.`,
    author: `Einar Persson`,
    siteUrl: `https://eicxv.com`,
    keywords: [`programming`, `art`, `architecture`],
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
  ],
};
