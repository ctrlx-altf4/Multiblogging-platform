//components
import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
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
      </Admin>
    </Layout>
  );
};
export default Blog;
