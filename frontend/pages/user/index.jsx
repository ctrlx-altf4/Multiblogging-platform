//components
import Layout from "../../components/Layout";
import Private from "../../components/Auth/private";
const index = () => {
  return (
    <Layout>
      <Private>
        <h1>From User</h1>
      </Private>
    </Layout>
  );
};
export default index;
