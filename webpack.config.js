const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    // 'immediate-loading': './src/assets/scripts/immediate-loading.js',
    notFound: './src/assets/scripts/notFound.js',
    index: './src/assets/scripts/gulp-modules/index.js',
    header: './src/assets/scripts/modules/header/header.js',
    footer: './src/assets/scripts/modules/footer/footer.js',
    about: './src/assets/scripts/gulp-modules/about.js',
    projects: './src/assets/scripts/gulp-modules/projects.js',
    property: './src/assets/scripts/gulp-modules/property.js',
    news: './src/assets/scripts/gulp-modules/news.js',
    contacts: './src/assets/scripts/gulp-modules/contacts.js',
    socialProjects: './src/assets/scripts/gulp-modules/social-projects.js',
    singleProject: './src/assets/scripts/gulp-modules/single-project.js',
    singleProperty: './src/assets/scripts/gulp-modules/single-property.js',
    singleNews: './src/assets/scripts/gulp-modules/single-news.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production'),
        },
      },
    }),
  ],
};

module.exports = config;
