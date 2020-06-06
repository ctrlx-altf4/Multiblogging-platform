import Head from "next/head";

import { API, DOMAIN, APP_NAME } from "../../config";
//**ToDo */
const SeoHead = ({ descContent, ogTitle, url }) => (
  <Head>
    <title> | {APP_NAME}</title>
    <meta name="description" content={descContent} />
    <link rel="canonical" href={`${DOMAIN}${url}`} />
    <meta property="og:title" content={`${ogTitle} |${APP_NAME}`} />
    <meta property="og:description" content={descContent} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${DOMAIN}${url}`} />
    <meta property="og:site_name" content={`${APP_NAME}`} />
    {/**Todo SEO */}
    {/* further SEO */}
    <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
    <meta
      property="og:image:secure_url"
      content={`${DOMAIN}/static/images/seoImg.jpg`}
    />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="fb:app_id" content={`${APP_NAME}`} />
  </Head>
);

export default SeoHead;
