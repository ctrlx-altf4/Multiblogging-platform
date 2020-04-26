import Link from "next/link";
import moment from "moment";
import { API } from "../../config";

const RelatedCard = ({ blog }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%" }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>
      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: blog.excerpt }}
          ></p>
        </section>
      </div>
      <div className="card-body">
        Posted {moment(blog.updatedAt).fromNow()} by{" "}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a>{blog.postedBy.username}</a>
        </Link>
      </div>
    </div>
  );
};
export default RelatedCard;
