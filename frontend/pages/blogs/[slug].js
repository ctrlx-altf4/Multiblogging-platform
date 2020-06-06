import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { SERVER, API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";

import { Button } from "reactstrap";
import { GiQuillInk } from "react-icons/gi";
import { FaClock } from "react-icons/fa";

import Layout from "../../components/Layout";
import DisqusThred from "../../components/DisqusThread";
import RelatedCard from "../../components/blog/RelatedCard";

const SingleBlog = ({ blog }) => {
  const [related, setRelated] = useState([]);

  console.log(blog);
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
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <meta name="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={`${blog.mdesc}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      {/* 
      <meta property="og:image" content ={`${API}/blog/photo/${blog.slug}`}/>
      <meta property="og:image:secure_url" content ={`${API}/blog/photo/${blog.slug}`}/>
      <meta property="og:image:type" content ="image/jpg"/>
      <meta property="fb:app_id" content ={`${FB_APP_ID}`}/> */}
    </Head>
  );
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="mr-1 ml-1 mt-3 mb-3 category-title">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <>
        <Link key={i} href={`/tags/${t.slug}`}>
          <a className="mr-1 ml-1 mt-3 mb-3">
            <Button color="primary" size="sm">
              {t.name}
            </Button>
          </a>
        </Link>
      </>
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
  const showComments = () => {
    return (
      <div>
        <DisqusThred
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };
  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid col-md-8">
              <div className="border-left-custom font-header">
                {showBlogCategories(blog)}
              </div>
              <h1 className="h1 font-header mt-4"> {blog.title}</h1>
              <section>
                <div
                  className="row img-hover-parent pointer"
                  style={{ marginTop: 30 }}
                >
                  <img
                    src={`${SERVER}/featured/${blog.photo[0]}`}
                    alt={blog.title}
                    className="img img-fluid featured-image img-hover"
                  />
                </div>
              </section>
              <section>
                <p className="lead mt-3">
                  <GiQuillInk className="icon-custom" />
                  <Link href={`/profile/${blog.postedBy.username}`}>
                    <a className="author">{blog.postedBy.username}</a>
                  </Link>
                </p>
                <p>
                  <Button size="sm" className="btn btn-light">
                    <FaClock className="icon-custom" /> Published:{" "}
                    {moment(blog.updatedAt).fromNow()}
                  </Button>
                </p>
              </section>
              <section>
                <div
                  dangerouslySetInnerHTML={{ __html: blog.body }}
                  className="lead"
                ></div>
                {showBlogTags(blog)}
                <br />
                <hr />
                {blog.postedBy.username}
                <hr />
              </section>
            </div>
          </article>
          <div className="container mt-5 pb-5">
            <h2 className="h2 mb-5 font-header border-left-custom">
              Related Blogs
            </h2>
            <div className="row">{showRelatedBlogs()}</div>
          </div>
          <div className="container pt-5 pb-5">
            <h2 className="h2 mb-5 font-header border-left-custom">
              Leave a Reply
            </h2>
            {showComments()}
          </div>
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
