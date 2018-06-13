const webpack = require("webpack");
let webpackConfig = require('./webpack.config');
webpackConfig.watch = true;
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
  }
  // Done processing
});