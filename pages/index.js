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
  const companies = await axios.get(
    `${process.env.NEXT_PUBLIC_SELF_HOSTNAME}/api/companies`
  );

  return {
    props: {
      companies: companies.data.companies,
    },
  };
}

export default Index;
