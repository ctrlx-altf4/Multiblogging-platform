//components
import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h1>Manage Blog</h1>
            </div>
            <div className="col-md-12">
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default Blog;
