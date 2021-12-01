const withTM = require('next-transpile-modules')([
  '@eicxv/utility',
  '@eicxv/plywood-bending',
  '@eicxv/reaction-diffusion',
]);

module.exports = withTM({
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
});
