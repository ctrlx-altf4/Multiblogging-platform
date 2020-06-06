import Head from "next/head";
import Link from "next/link";
//components
import Layout from "../../components/Layout";
import Private from "../../components/Auth/private";
const index = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/user/crud/blog">
                    <a>Create Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/crud/blogs">
                    <a>Update/Delete Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};
export default index;
