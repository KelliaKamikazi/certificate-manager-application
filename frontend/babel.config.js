module.exports = function (api) {
  api.cache(true);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: '> 0.25%, not dead',
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      [
        '@babel/preset-react',
        {
          development: isDevelopment,
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
    ],
  };
};
