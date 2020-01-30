require("dotenv").config();

const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    hostname: process.env.SELF_HOSTNAME,
    SHEETS_URL: process.env.SHEETS_URL
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  }
});
