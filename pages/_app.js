import "../css/app.css";

import Link from "next/link";

import { SizeProvider } from "../contexts/SizeContext";
import { ServicesProvider } from "../contexts/ServicesContext";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <header className="container">
        <Link href="/">
          <a>
            <h1 className="text-xxl font-display mt-md mb-xl text-center">
              Seattle Design
            </h1>
          </a>
        </Link>
      </header>

      <main className="container mb-xl">
        <SizeProvider>
          <ServicesProvider>
            <Component {...pageProps} />
          </ServicesProvider>
        </SizeProvider>
      </main>

      <footer className="text-gray-dark container mb-lg leading-normal">
        <p>
          <a className="underline" href="https://seattledesign.info">
            Seattle Design
          </a>{" "}
          was started in 2017 by{" "}
          <a className="underline" href="https://zackseuberling.com">
            Zack Seuberling
          </a>{" "}
          to help Seattle designers find active advertising, branding,
          environmental, interactive, print, strategy, type and video design
          studios and agencies in the Emerald City.
        </p>
        <p>
          As of January 2021, it is no longer in active development. Please
          visit{" "}
          <a
            className="underline"
            href="https://seattlecreative.directory/"
            rel="noreferrer noopener"
          >
            seattlecreative.directory
          </a>
        </p>
      </footer>
    </React.Fragment>
  );
}

export default MyApp;
