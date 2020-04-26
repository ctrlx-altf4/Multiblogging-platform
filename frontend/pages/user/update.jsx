//components
import Layout from "../../components/Layout";
import Private from "../../components/Auth/private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

const update = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
};
export default update;
