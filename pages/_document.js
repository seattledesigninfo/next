import Document, { Html, Head, Main, NextScript } from "next/document";

class SeattleDesign extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css?family=Kavivanar|Roboto+Mono:400,700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="A comprehensive guide to the thriving Seattle graphic and interactive design community."
          />
          <meta property="og:url" content="https://seattledesign.info" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Seattle Design" />
          <meta
            property="og:description"
            content="A comprehensive guide to the thriving Seattle graphic and interactive design community."
          />
          <meta
            property="og:image"
            content="https://seattledesign.info/og-image.png"
          />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="315" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@seadesinf" />
          <meta name="twitter:creator" content="@zackseuberling" />
          <meta name="twitter:title" content="Seattle Design" />
          <meta
            name="twitter:description"
            content="A comprehensive guide to the thriving Seattle graphic and interactive design community."
          />
          <meta
            name="twitter:image"
            content="https://seattledesign.info/og-image.png"
          />
          <meta
            name="twitter:image:alt"
            content="Logo for the Seattle Design list."
          />
          <meta name="msapplication-TileColor" content="#0066cc" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#0066cc" />
          <script
            async
            defer
            data-domain="seattledesign.info"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SeattleDesign;
