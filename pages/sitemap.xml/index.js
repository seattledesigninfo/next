import { airtable } from "../../lib/airtable";
import { slugify } from "../../lib/helpers";

import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const response = await airtable.get(url, {
    params: {
      view: "Grid view",
    },
  });

  return getServerSideSitemap(
    ctx,
    response.data.records.map((company) => {
      return {
        loc: `https://www.seattledesign.info/company/${slugify(
          company.fields.name
        )}/${company.id}`,
        lastmod: new Date().toISOString(),
      };
    })
  );
};

// Default export to prevent next.js errors
const Sitemap = () => {};
export default Sitemap;
