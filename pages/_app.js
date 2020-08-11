import "../css/app.css";

import { SizeProvider } from "../contexts/SizeContext";
import { ServicesProvider } from "../contexts/ServicesContext";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <header>
        <h1>Seattle Design</h1>
      </header>

      <main>
        <SizeProvider>
          <ServicesProvider>
            <Component {...pageProps} />
          </ServicesProvider>
        </SizeProvider>
      </main>
    </React.Fragment>
  );
}

export default MyApp;
