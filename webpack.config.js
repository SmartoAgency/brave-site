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
    documents: './src/assets/scripts/gulp-modules/documents.js',
    gallery: './src/assets/scripts/gulp-modules/gallery.js',
    safe: './src/assets/scripts/gulp-modules/safe.js',
    green: './src/assets/scripts/gulp-modules/green.js',
    hillsClub: './src/assets/scripts/gulp-modules/hills-club.js',
    infrastructure: './src/assets/scripts/gulp-modules/infrastructure.js',
    invest: './src/assets/scripts/gulp-modules/invest.js',
    location: './src/assets/scripts/gulp-modules/location.js',
    floors: './src/assets/scripts/gulp-modules/floors.js',
    contacts: './src/assets/scripts/gulp-modules/contacts.js',
    safe: './src/assets/scripts/gulp-modules/safe.js',
    progress: './src/assets/scripts/gulp-modules/progress.js',
    progressDetails: './src/assets/scripts/gulp-modules/progress-details.js',
    purchaseTerms: './src/assets/scripts/gulp-modules/purchase-terms.js',
    techDescr: './src/assets/scripts/gulp-modules/tech-descr.js',
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
