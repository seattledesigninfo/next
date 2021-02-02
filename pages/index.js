import { airtable } from "../lib/airtable";
import { useServicesState } from "../contexts/ServicesContext";
import { useSizeState } from "../contexts/SizeContext";

import Layout from "../components/Layout";
import Company from "../components/Company";

function Index({ companies }) {
  const { active: activeServices } = useServicesState();
  const { active: activeSizes } = useSizeState();

  return (
    <Layout>
      <section className="grid flex-grow-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
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
  try {
    const response = await airtable.get("/Companies", {
      params: {
        view: "Grid view",
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
      revalidate: 3600,
    };
  }
}

export default Index;
