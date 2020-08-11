import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Seattle Design</title>
        <meta property="og:title" content="Seattle Design" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </React.Fragment>
  );
};

export default Layout;
