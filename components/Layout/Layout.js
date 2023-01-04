import Head from "next/head";

import Services from "../../components/Services";
import Sizes from "../../components/Sizes";

const Layout = ({ hideFilters = false, children }) => {
  return (
    <>
      <Head>
        <title>Seattle Design</title>
        <meta property="og:title" content="Seattle Design" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {!hideFilters && (
        <section className="text-center mb-lg">
          <Services />
          <Sizes />
        </section>
      )}
      {children}
    </>
  );
};

export default Layout;
