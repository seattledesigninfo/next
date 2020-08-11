import "../css/app.css";

import { SizeProvider } from "../contexts/SizeContext";
import { ServicesProvider } from "../contexts/ServicesContext";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <header className="container">
        <h1 className="text-xxl font-display mt-md mb-xl text-center">
          Seattle Design
        </h1>
      </header>

      <main className="container">
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
