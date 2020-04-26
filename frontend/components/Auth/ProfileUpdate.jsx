import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";

const TOKEN = "MultiBlogToken_ctrlxAltf4";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    about: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: "",
  });
  const token = getCookie(TOKEN);
  const {
    username,
    email,
    name,
    password,
    about,
    success,
    error,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const handleChange = (e, name) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          succes: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loadin: false,
        });
      }
    });
  };
  const ProfileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, "photo")}
            hidden
          ></input>
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">User Name</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => handleChange(e, "username")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => handleChange(e, "name")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="text"
          className="form-control"
          value={password}
          onChange={(e) => handleChange(e, "password")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => handleChange(e, "email")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          type="text"
          className="form-control"
          value={about}
          onChange={(e) => handleChange(e, "about")}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">"Iamge"</div>
          <div className="col-md-8 mb-5">{ProfileUpdateForm()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
