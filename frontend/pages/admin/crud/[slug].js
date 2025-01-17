//components
import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h1>Update Blog</h1>
            </div>
            <div className="col-md-12">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default CategoryTag;
