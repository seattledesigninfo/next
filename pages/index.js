import { setup } from "axios-cache-adapter";

import { useServicesState } from "../contexts/ServicesContext";
import { useSizeState } from "../contexts/SizeContext";

import css from "../css/layout.css";
import Layout from "../components/Layout";
import Company from "../components/Company";

function Index({ companies }) {
  const { active: activeServices } = useServicesState();
  const { active: activeSizes } = useSizeState();

  console.log(activeServices);

  return (
    <Layout>
      <section className={css.companies}>
        {companies.map((company, i) => (
          <Company
            key={`company-${i}`}
            company={company}
            appState={{ services: activeServices, sizes: activeSizes }}
          />
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
    console.log(err);
    return {
      props: {
        companies: [],
      },
    };
  }
}

export default Index;
