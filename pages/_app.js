import "../css/app.css";
import filter from "../css/filter.css";

import { SizeProvider } from "../contexts/SizeContext";
import { ServicesProvider } from "../contexts/ServicesContext";

import Services from "../components/Services";
import Sizes from "../components/Sizes";

function MyApp({ Component, pageProps }) {
  return (
    <SizeProvider>
      <ServicesProvider>
        <section className={filter.companies}>
          <Services />
          <Sizes />
        </section>

        <Component {...pageProps} />
      </ServicesProvider>
    </SizeProvider>
  );
}

export default MyApp;
