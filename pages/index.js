import { setup } from "axios-cache-adapter";

import css from "../css/layout.css";
import Layout from "../components/Layout";
import Company from "../components/Company";

function Index({ companies }) {
  return (
    <Layout>
      <section className={css.companies}>
        {companies.map((company, i) => (
          <Company key={`company-${i}`} company={company} />
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const api = setup({
    baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}`,
    cache: { maxAge: 15 * 60 * 1000, exclude: { query: false } },
  });

  try {
    const response = await api.get("/Companies", {
      params: {
        view: "Grid view",
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
    });

    return {
      props: {
        companies: response.data.records,
      },
    };
  } catch (err) {
    return {
      props: {
        companies: [],
      },
    };
  }
}

export default Index;
