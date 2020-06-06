//components
import Layout from "../../../components/Layout";
import Private from "../../../components/Auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";

const CreateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <BlogCreate />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};
export default CreateBlog;
