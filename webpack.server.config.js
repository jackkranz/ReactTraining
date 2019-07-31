const root = require('app-root-path').path;

module.exports = {
  entry: `${root}/server/index.js`,
  target: 'node',
  mode: 'development',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [
    /^[a-z\-0-9]+$/, // Ignore node_modules folder,
  ],
  output: {
    filename: 'compiled', // output file
    path: `${root}/build_server`,
    libraryTarget: 'commonjs',
  },
  resolve: {
    modules: [`${root}/node_modules`],
    // Add in `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.config.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { include: __dirname },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react'],
            },
          },
        ],
      },
    ],
  },
};
