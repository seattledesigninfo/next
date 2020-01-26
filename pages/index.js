import axios from "axios";

import Company from "../components/Company";

function Index({ companies }) {
  return companies.map((company, i) => (
    <Company key={`company-${i}`} company={company} />
  ));
}

Index.getInitialProps = async () => {
  const req = await axios.get(`${process.env.SELF_HOSTNAME}/api/index`);
  return { ...req.data };
};

export default Index;
