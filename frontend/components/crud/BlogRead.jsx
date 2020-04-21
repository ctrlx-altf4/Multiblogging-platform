import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const token = "MultiBlogToken_ctrlxAltf4"; //cookie key

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const _token = getCookie(token);
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) console.log(data.error);
      else {
        setBlogs(data);
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete your blog?");
    if (answer) {
      console.log(_token);
      removeBlog(slug, _token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          loadBlogs();
        }
      });
    }
  };
  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="ml-5 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    }
  };
  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <div className="pb-5" key={index}>
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name}| Published on{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <div className="pb-5">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteConfirm(blog.slug)}
            >
              Delete
            </button>
            {showUpdateButton(blog)}
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <p>Update/Delete Blogs</p>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {message && <div className="alert alert-warning">{message}</div>}
            {showAllBlogs()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default BlogRead;
