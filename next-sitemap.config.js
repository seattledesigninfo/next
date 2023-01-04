// next-sitemap.js
module.exports = {
  siteUrl: "https://www.seattledesign.info",
  generateRobotsTxt: true,
  exclude: ["/sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.seattledesign.info/sitemap.xml", // <==== Add here
    ],
  },
};
