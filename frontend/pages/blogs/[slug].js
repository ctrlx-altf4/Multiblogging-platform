import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";

import RelatedCard from "../../components/blog/RelatedCard";

const SingleBlog = ({ blog }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated(blog).then((data) => {
      if (data.error) console.log(data.errror);
      else setRelated(data);
      console.log(data);
    });
  };
  useEffect(() => {
    loadRelated();
  }, []);
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3 mb-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/categories/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3 mb-3">{t.name}</a>
      </Link>
    ));
  const showRelatedBlogs = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <RelatedCard blog={blog} />
        </article>
      </div>
    ));
  };
  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: -30 }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
              <section>
                <p className="lead mt-3 mark">
                  Written By {blog.postedBy.name} | Published{" "}
                  {moment(blog.updatedAt).fromNow()}
                </p>
                <div className="pb-3">
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                  <br />
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div
                  className="col-md-12 lead"
                  dangerouslySetInnerHTML={{ __html: blog.body }}
                ></div>
              </section>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related Blogs</h4>
              <hr />
              <div className="row">{showRelatedBlogs()}</div>
            </div>
            <div className="conteiner pb-5">
              <p>Show Comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};
SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else
      return {
        blog: data,
      };
  });
};
export default SingleBlog;
