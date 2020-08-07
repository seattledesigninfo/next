import axios from "axios";

import css from "../css/layout.css";
import Company from "../components/Company";

function Index({ companies }) {
  return (
    <section className={css.companies}>
      {companies.map((company, i) => (
        <Company key={`company-${i}`} company={company} />
      ))}
    </section>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Companies`,
      {
        params: {
          view: "Grid view",
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );

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
