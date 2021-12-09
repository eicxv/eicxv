const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTranspileModules = require('next-transpile-modules')([
  '@eicxv/utility',
  '@eicxv/ui',
  '@eicxv/plywood-bending',
  '@eicxv/reaction-diffusion',
  '@eicxv/n-body-galaxy',
]);

module.exports = withBundleAnalyzer(
  withTranspileModules({
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(glsl|vert|frag)$/i,
        loader: 'raw-loader',
      });
      return config;
    },
    images: {
      domains: ['images.ctfassets.net'],
    },
    poweredByHeader: false,
  })
);
