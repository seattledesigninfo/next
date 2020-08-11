import Head from "next/head";
import filter from "../../css/filter.css";

import Services from "../../components/Services";
import Sizes from "../../components/Sizes";

const Layout = ({ hideFilters = false, children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Seattle Design</title>
        <meta property="og:title" content="Seattle Design" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {!hideFilters && (
        <section className={filter.companies}>
          <Services />
          <Sizes />
        </section>
      )}
      {children}
    </React.Fragment>
  );
};

export default Layout;
