import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";

import { API, SERVER } from "../../config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { QuillModules, QuillFormats } from "../../helpers/quill";
const BlogLocal = "blog_CtrlxAltf4";
const cookieToken = "MultiBlogToken_ctrlxAltf4"; //cookie key

const BlogUpdate = ({ router }) => {
  const [data, setData] = useState({
    title: "",
    body: "",
    excerpt: "",
    photo: null,
    categories: [],
    tags: [],
  });
  const [originalData, setOriginalData] = useState({});
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [values, setValues] = useState({
    error: "",
    success: "",
  });
  const { error, success } = values;

  const token = getCookie(cookieToken);
  let x;
  useEffect(() => {
    initBlog();
    init();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug)
      singleBlog(router.query.slug).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setValues({ ...values, title: res.title });
          let ca = [];
          let ta = [];
          res.categories.map((cat, i) => ca.push(cat._id));
          res.tags.map((tag, i) => ta.push(tag._id));

          res.tags = ta;
          res.categories = ca;
          res.photo = res.photo[0];

          setOriginalData(res);

          setData({
            title: res.title,
            body: res.body,
            categories: res.categories,
            tags: res.tags,
            excerpt: res.excerpt,
            photo: res.photo,
          });
        }
      });
  };

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

  const handleChange = (value, name) => {
    setData({ ...data, [name]: value });

    name === "body" &&
      typeof window !== undefined &&
      localStorage.setItem(BlogLocal, JSON.stringify(value));
  };

  const editBlog = (e) => {
    e.preventDefault();

    console.log(data);
    console.log(originalData);
    const updated = Object.fromEntries(
      Object.entries(data).filter((each) => each[1] !== originalData[each[0]])
    );
    updateBlog(updated, token, router.query.slug);
    // .then((res) => {
    //   if (res.error) {
    //     setValues({ ...values, error: res.error });
    //   } else {
    //     setValues({
    //       ...values,
    //       title: "",
    //       success: `Blog titled "${res.title}" is successfully updated`,
    //     });
    //     if (isAuth() && isAuth().role === 1) {
    //       Router.replace(`/admin/crud/${router.query.slug}`);
    //     } else if (isAuth() && isAuth().role === 0) {
    //       Router.replace(`/user/crud/${router.query.slug}`);
    //     }
    //   }
    // });
  };

  const handleToggle = (checked, type) => {
    const index = data[type].indexOf(checked);
    const alreadyChecked = [...data[type]];
    index === -1
      ? alreadyChecked.push(checked)
      : alreadyChecked.splice(index, 1);
    setData({ ...data, [type]: alreadyChecked });
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            className="form-control"
            value={data.title}
            onChange={(e) => handleChange(e.currentTarget.value, "title")}
          />
        </div>
        <div className="form-group">
          {data.body && (
            <ReactQuill
              value={data.body}
              modules={QuillModules}
              formats={QuillFormats}
              placeholder="Write your post"
              onChange={(e) => handleChange(e, "body")}
            />
          )}
        </div>

        <div className="form-group border-left-custom">
          {data.excerpt && (
            <ReactQuill
              value={data.excerpt}
              theme="bubble"
              modules={QuillModules}
              formats={QuillFormats}
              placeholder="Summarize the content as Excerpt"
              onChange={(e) => handleChange(e, "excerpt")}
            />
          )}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        </div>
      </form>
    );
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
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-danger"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );
  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          <p>Create Blog Form</p>
          <div className="pt-3">
            {updateBlogForm()}
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group pb-4">
            <h5>Featured Image</h5>
            <hr />
            <small className="text-muted">Maximum size: 1Mb</small>
            <br />
            {data.photo && (
              <img
                src={
                  typeof data.photo === "string"
                    ? `${SERVER}/featured/${data.photo}`
                    : URL.createObjectURL(data.photo)
                }
                alt={data.title}
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
              ></input>
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

export default withRouter(BlogUpdate);
