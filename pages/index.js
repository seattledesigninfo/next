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

Index.getInitialProps = async () => {
  const req = await axios.get(`${process.env.SELF_HOSTNAME}/api/index`);
  return { ...req.data };
};

export default Index;
