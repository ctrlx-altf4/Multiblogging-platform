import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";

import { API } from "../../config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { QuillModules, QuillFormats } from "../../helpers/quill";
const BlogLocal = "blog_CtrlxAltf4";
const cookieToken = "MultiBlogToken_ctrlxAltf4"; //cookie key

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
  });
  const { error, success, formData, title } = values;
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const token = getCookie(cookieToken);
  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug)
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          let ca = [];
          let ta = [];
          data.categories.map((cat, i) => ca.push(cat._id));
          data.tags.map((tag, i) => ta.push(tag._id));
          setChecked(ca);
          setCheckedTag(ta);
        }
      });
  };
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };
  const handleChange = (e, name) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };
  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const editBlog = (e) => {
    e.preventDefault();

    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled "${data.title}" is successfully updated`,
        });
        if (isAuth() && isAuth().role === 1) {
          Router.replace(`/admin/crud/${router.query.slug}`);
        } else if (isAuth() && isAuth().role === 0) {
          Router.replace(`/user/crud/${router.query.slug}`);
        }
      }
    });
  };
  const handleToggle = (c) => {
    setValues({ ...values, error: "" });
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };
  const handleToggleTag = (t) => {
    setValues({ ...values, error: "" });
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    setCheckedTag(all);
    formData.set("tags", all);
  };
  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => handleChange(e, "title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            value={body}
            modules={QuillModules}
            formats={QuillFormats}
            placeholder="Write your post"
            onChange={handleBody}
          />
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
            checked={checked.indexOf(c._id) !== -1}
            onChange={() => handleToggle(c._id)}
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
            checked={checkedTag.indexOf(t._id) !== -1}
            onChange={() => handleToggleTag(t._id)}
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
          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              wdth="100%"
              alt={title}
            />
          )}
        </div>
        <div className="col-md-4">
          <div className="form-group pb-4">
            <h5>Featured Image</h5>
            <hr />
            <small className="text-muted">Maximum size: 1Mb</small>
            <br />
            <label className="btn btn-outline-info">
              Upload Featured Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e, "photo")}
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
