import { useEffect } from "react";
import Router from "next/router";

//styles
import "./styles/main.scss";
import "../node_modules/nprogress/nprogress.css";
import "../node_modules/react-quill/dist/quill.bubble.css";
import "../node_modules/react-quill/dist/quill.snow.css";

import * as gtag from "../helpers/gtag";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.trackPageView(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return <Component {...pageProps} />;
}
