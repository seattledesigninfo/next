require("dotenv").config();
const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

const nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /api/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 5,
            maxAgeSeconds: 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withCSS(withOffline(nextConfig));
