import axios from "axios";
import { slugify } from "../../lib/helpers";

import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Companies`;
  const response = await axios.get(url, {
    params: {
      view: "Grid view",
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
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
