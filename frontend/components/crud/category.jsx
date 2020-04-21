import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/link";

import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

import { TOKEN } from "../../config";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: "",
    reload: false,
  });
  const { name, error, success, categories, reload, removed } = values;

  const token = getCookie(TOKEN);

  useEffect(() => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
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
    let answer = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (answer) {
      removeCategory(slug, token).then((data) => {
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
      return <p className="text-success">Category is created</p>;
    }
  };
  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exists</p>;
    }
  };
  const showRemove = () => {
    if (removed) {
      return <p className="text-danger">Category is Removed</p>;
    }
  };
  const NewCategoryForm = () => (
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
  const showCategories = () => {
    return categories.map((c, i) => {
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
        {NewCategoryForm()}
        {showCategories()}
      </div>
    </>
  );
};
export default Category;
