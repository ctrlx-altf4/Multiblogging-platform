import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { QuillModules, QuillFormats } from "../../helpers/quill";

const BlogLocal = "blog_CtrlxAltf4";
const cookieToken = "MultiBlogToken_ctrlxAltf4"; //cookie key

const CreateBlog = ({ router }) => {
  const blogFromLocalStorage = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem(BlogLocal)) {
      return JSON.parse(localStorage.getItem(BlogLocal));
    } else {
      return false;
    }
  };

  const [data, setData] = useState({
    title: "",
    body: blogFromLocalStorage(),
    excerpt: "",
    photo: null,
    categories: [],
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [validation, setValidation] = useState({
    error: "",
    success: "",
  });

  const token = getCookie(cookieToken);

  useEffect(() => {
    init();
  }, [router]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });

    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const validate = () => {
    data.body.length < 200 &&
      setValidation({
        success: null,
        error: "Content Too short Please increase the content Length",
      });
    data.title.length < 10 &&
      setValidation({
        success: null,
        error: "The title should be at least 10 characters",
      });
    data.categories.length === 0 &&
      setValidation({
        success: null,
        error: "At least One Categories should be selected",
      });
    data.tags.length === 0 &&
      setValidation({
        success: null,
        error: "At least One Tags should be selected",
      });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    validate();
    //**TODO VALIDATION */
    console.log(validation.error);
    !validation.error && console.log("executed");
    createBlog(data, token).then((data) => {
      console.log(data.error);
      if (data.error) {
        setValidation({ success: "null", error: data.error });
      } else {
        alert("done");
      }
    });
  };

  const handleChange = (value, name) => {
    setData({ ...data, [name]: value });

    name === "body" &&
      typeof window !== undefined &&
      localStorage.setItem(BlogLocal, JSON.stringify(value));
  };

  const handleToggle = (checked, type) => {
    const index = data[type].indexOf(checked);
    const alreadyChecked = [...data[type]];
    index === -1
      ? alreadyChecked.push(checked)
      : alreadyChecked.splice(index, 1);
    setData({ ...data, [type]: alreadyChecked });
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li className="list-unstyled" key={i}>
          <input
            className="mr-2"
            type="checkbox"
            checked={data.categories.indexOf(c._id) !== -1}
            onChange={() => handleToggle(c._id, "categories")}
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li className="list-unstyled" key={i}>
          <input
            className="mr-2"
            type="checkbox"
            checked={data.tags.indexOf(t._id) !== -1}
            onChange={() => handleToggle(t._id, "tags")}
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: validation.error ? "" : "none" }}
    >
      {validation.error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: validation.success ? "" : "none" }}
    >
      {validation.success}
    </div>
  );
  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            className="form-control"
            value={data.title}
            onChange={(e) => handleChange(e.currentTarget.value, "title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            value={data.body}
            modules={QuillModules}
            formats={QuillFormats}
            placeholder="Write your post"
            onChange={(e) => handleChange(e, "body")}
          />
        </div>

        <div className="form-group border-left-custom">
          <ReactQuill
            value={data.excerpt}
            theme="bubble"
            modules={QuillModules}
            formats={QuillFormats}
            placeholder="Summarize the content as Excerpt"
            onChangeSelection={() => console.log("changed selec")}
            onChange={(e) => handleChange(e, "excerpt")}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div>
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div>
          <div className="form-group pb-4">
            <h5>Featured Image</h5>
            <hr />
            <small className="text-muted">Maximum size: 1Mb</small>
            <br />
            {data.photo && (
              <img
                src={URL.createObjectURL(data.photo)}
                alt="featured Photo"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
            <label className="btn btn-outline-info">
              Upload Featured Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(e.currentTarget.files[0], "photo")
                }
                hidden
              />
            </label>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: 200, overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: 200, overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
