//components
import { FB_APP_ID } from "../config";

import { FacebookProvider, Page } from "react-facebook";
import Layout from "../components/Layout";

const index = () => {
  return (
    <Layout>
      <FacebookProvider appId={FB_APP_ID} style={{ width: "100%" }}>
        <Page
          href="https://www.facebook.com/RefreshmentNepal"
          tabs="timeline"
        />
      </FacebookProvider>
    </Layout>
  );
};
export default index;
