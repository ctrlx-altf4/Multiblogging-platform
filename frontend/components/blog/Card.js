import Link from "next/link";

import { Button } from "reactstrap";
import moment from "moment";
import { FaShare, FaFacebookSquare, FaClock } from "react-icons/fa";
import { FacebookProvider, Share } from "react-facebook";

import { SERVER, FB_APP_ID } from "../../config";

const Card = ({ blog }) => {
  console.log(blog);
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="category-title font-weight-bold mr-1 ml-1">{c.name}</a>
      </Link>
    ));

  return (
    <div className="blog-card mb-5">
      <div className="row no-gutters bg-light">
        <div className="col-md-6  mb-md-0 p-md-4">
          <section className="img-hover-parent w-100">
            <img
              className="img img-fluid img-hover"
              style={{ maxHeight: "250px", width: "100%" }}
              src={`${SERVER}/featured/${blog.photo[0]}`}
              alt={blog.title}
            />
          </section>
        </div>

        <div className="col-md-6 p-4 pl-md-0">
          <section className="border-left-custom mt-0">
            {showBlogCategories(blog)}
          </section>
          <header>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h4 className="text-dark font-header">{blog.title}</h4>
              </a>
            </Link>
          </header>

          <section>
            <p className="lead mt-1">
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a className="author">{blog.postedBy.username}</a>
              </Link>

              <Button size="sm" className="btn btn-light">
                <FaClock className="icon-custom" /> Published:{" "}
                {moment(blog.updatedAt).fromNow()}
              </Button>
            </p>
          </section>

          <section>
            <div
              className="pb-3 truncate-two"
              dangerouslySetInnerHTML={{ __html: blog.excerpt }}
            />
          </section>
          <div className="mt-2">
            <FacebookProvider appId={FB_APP_ID}>
              <Share href="http://www.facebook.com">
                {({ handleClick, loading }) => (
                  <>
                    <FaFacebookSquare
                      disabled={loading}
                      onClick={handleClick}
                      className="fb-icon icon-custom ml-0"
                    />
                  </>
                )}
              </Share>
            </FacebookProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
