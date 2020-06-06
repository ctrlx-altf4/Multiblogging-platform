import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { withRouter } from "next/router";
import { useState } from "react";
import { listBlogsWithCategoriesTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME } from "../../config";
const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const SeoHeader = () => (
    <Head>
      <title> Programming Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming Blogs and Tutorial On react node next"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`$Latest Web development Tutorials on  |${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming Blogs and Tutorial On react node next"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      {/**Todo SEO */}
      {/* further SEO */}
      {/* <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`}/>
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${APP_NAME}`} /> */}
    </Head>
  );

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };
  const loadMoreBtn = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="btn btn-outline-primary btn-lg" onClick={loadMore}>
          Load More
        </button>
      )
    );
  };
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i} className="mb-4">
          <Card blog={blog} />
        </article>
      );
    });
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };
  return (
    <React.Fragment>
      {SeoHeader()}
      <Layout>
        <main>
          <div className="row">
            <div className="col-md-8">
              <div className="container-fluid">{showAllBlogs()}</div>
              <div className="container-fluid">{showLoadedBlogs()}</div>
              <div className="text-center pt-5 pb-5">{loadMoreBtn()}</div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <h3 className="h3 font-header border-left-custom">
                  Trending This Week
                </h3>
                <br />
                Trending Cards Content here
                <br />
                aksjdflajs;ldfj
                <br />
                aksdfjlkasj;dfk
                <br />
                asldfjljs; a<br />
                aklsldjflkjas;ljfd;lkajs;kldfj;
                <br />
                lasjfa;sjdfkjaks;jf;klajs;klfdj
                <br />
                ;laksjf;klj;skdjfklaj
                <br />
              </div>
              <div className="row mt-5">
                <h3 className="h3 font-header border-left-custom">
                  Admins Choice
                </h3>
                Admins Choice Cards Content here
                <br />
                aksjdflajs;ldfj
                <br />
                aksdfjlkasj;dfk
                <br />
                asldfjljs; a<br />
                aklsldjflkjas;ljfd;lkajs;kldfj;
                <br />
                lasjfa;sjdfkjaks;jf;klajs;klfdj
                <br />
                ;laksjf;klj;skdjfklaj
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let limit = 2;
  let skip = 0;
  return listBlogsWithCategoriesTags(skip, limit).then((data) => {
    if (data.error) console.log(data.error);
    else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};
export default withRouter(Blogs);
