//components
import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import Category from "../../../components/crud/category";
import Tags from "../../../components/crud/tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h1>Manage Category And Tags</h1>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tags />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default CategoryTag;
