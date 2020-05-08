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
            <div className="col-md-12 pt-5 pb-5">
              <h1>Create a new Blog</h1>
            </div>
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
