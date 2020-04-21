//library
import { useState } from "react";
import Router from "next/router";
//components

//styles

//actions
import { signInAction, authenticate, isAuth } from "../../actions/auth";

const SignInComponent = () => {
  const init = {
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  };
  const [values, setValues] = useState(init);
  const { email, password, error, loading, message, showForm } = values;

  const showLoading = () =>
    loading && <div className="alert alert-info">loading...</div>;
  const showMessage = () =>
    message && <div className="alert alert-info">{message}</div>;
  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    console.log(user);
    signInAction(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) Router.push("/admin");
          if (isAuth() && isAuth().role === 0) Router.push("/user");
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, error: false, [name]: value });
  };
  const SignInForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="email"
            value={email}
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            value={password}
            type="password"
            className="form-control"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showError()}
      {showMessage()}
      {showLoading()}
      {showForm && SignInForm()}
    </React.Fragment>
  );
};
export default SignInComponent;
