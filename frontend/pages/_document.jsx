import Document, { Html, Head, Main, NextScript } from "next/document";
import getConfig from "next/config";
import { GA_TRACKING_ID } from "../config";

const { publicRuntimeConfig } = getConfig;

class MyDocument extends Document {
  GoogleAnalytics = () => {
    // if (publicRuntimeConfig.PRODUCTION)
    return {
      __html: `
      window.dataLayer = window.dataLayer || []; 
      function gtag()
      {dataLayer.push(arguments)}

      gtag('js', new Date());
       gtag('config',${GA_TRACKING_ID});
      `,
    };
  };

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="stylesheet" href="/styles/custom-bootstrap.scss" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display&display=swap"
            rel="stylesheet"
          ></link>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          ></script>
          <script dangerouslySetInnerHTML={this.GoogleAnalytics()}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
