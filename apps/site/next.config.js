const withTranspileModules = require('next-transpile-modules')([
  '@eicxv/dynamic-relaxation',
  '@eicxv/n-body-galaxy',
  '@eicxv/plywood-bending',
  '@eicxv/reaction-diffusion',
  '@eicxv/shallow-water',
  '@eicxv/soap-film',
  '@eicxv/ui',
  '@eicxv/utility',
]);

module.exports = withTranspileModules({
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
