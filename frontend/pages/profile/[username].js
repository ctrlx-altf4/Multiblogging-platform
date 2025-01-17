import Link from "next/link";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";

import ContactForm from "../../components/form/ContactForm";
import Card from "../../components/blog/Card";

import SeoHead from "../../components/SeoHead";
//**Todo Check profile link Last maa username k xa? by creating a new user */
const UserProfile = ({ user, blogs, query }) => {
  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        // <article key={i}>
        //   <Card blog={blog} />
        // </article>
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="Lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <SeoHead
        descContent={`Blogs by ${user.username}`}
        url={`/profile/${query.username}`}
        ogTitle={user.username}
      />
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>{user.name}</h5>
                      <p className="text-muted">
                        Joined {moment(user.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <img
                        src={
                          user.username && `${API}/user/photo/${user.username}`
                        }
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: "100px", maxWidth: "100%" }}
                        alt="user profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary  pt-4 pb-4 pl-4 pr-4 text-light">
                    Recent blogs by {user.name}
                  </h5>
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary  pt-4 pb-4 pl-4 pr-4 text-light">
                    Message {user.name}
                  </h5>
                  <br />
                  <ContactForm authorEmail={user.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};
UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    }
    return { user: data.user, blogs: data.blogs, query };
  });
};
export default UserProfile;
