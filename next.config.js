const withOffline = require("next-offline");

const nextConfig = {
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /api/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api",
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

module.exports = withOffline(nextConfig);
