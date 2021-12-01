const withTM = require('next-transpile-modules')([
  'ui',
  'utility',
  'plywood-bending',
  'n-body-galaxy',
  'reaction-diffusion',
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
