import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/link";

import { isAuth, getCookie } from "../../actions/auth";
import { create, getTags, removeTag } from "../../actions/tag";

import { TOKEN } from "../../config";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: "",
    reload: false,
  });
  const { name, error, success, tags, reload, removed } = values;

  const token = getCookie(TOKEN);

  useEffect(() => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();

    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: true,
          error: false,
          name: "",
          removed: false,
          reload: !reload,
        });
      }
    });
  };
  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value, error: false, removed: "" });
    console.log(name);
  };
  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this Tag?");
    if (answer) {
      removeTag(slug, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            error: false,
            success: false,
            name: "",
            removed: !removed,
            reload: !reload,
          });
        }
      });
    }
  };
  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exists</p>;
    }
  };
  const showRemove = () => {
    if (removed) {
      return <p className="text-danger">Tag is Removed</p>;
    }
  };
  const NewTagForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
  const showTags = () => {
    return tags.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double Click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };
  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };
  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemove()}

      <div onMouseMove={mouseMoveHandler}>
        {NewTagForm()}
        {showTags()}
      </div>
    </>
  );
};
export default Tag;
