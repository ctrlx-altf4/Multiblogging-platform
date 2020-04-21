//components
import Layout from "../../components/Layout";
import Admin from "../../components/Auth/Admin";
import Link from "next/link";
const index = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h1>From Admin</h1>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Cateogry</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Tags</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/blog">
                    <a>Create Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Update/Delete Blog</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};
export default index;
