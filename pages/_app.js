import "../css/app.css";
import filter from "../css/filter.css";

import { SizeProvider } from "../contexts/SizeContext";
import { ServicesProvider } from "../contexts/ServicesContext";

import Services from "../components/Services";
import Sizes from "../components/Sizes";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <header>
        <h1>
          <a href="#about">Seattle Design</a>
        </h1>
      </header>

      <SizeProvider>
        <ServicesProvider>
          <section className={filter.companies}>
            <Services />
            <Sizes />
          </section>

          <Component {...pageProps} />
        </ServicesProvider>
      </SizeProvider>
    </React.Fragment>
  );
}

export default MyApp;
