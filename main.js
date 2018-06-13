const webpack = require("webpack");
const webpackConfig = require('./webpack.config');
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
  }
  // Done processing
});