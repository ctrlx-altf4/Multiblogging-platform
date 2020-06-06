//library
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
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
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="form-label-group">
                        <input
                          name="email"
                          id="inputEmail"
                          value={email}
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          onChange={handleChange}
                          required
                          autofocus
                        />
                        <label for="inputEmail">Email address</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          name="password"
                          id="inputPassword"
                          value={password}
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={handleChange}
                          required
                        />
                        <label for="inputPassword">Password</label>
                      </div>

                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          for="customCheck1"
                        >
                          Remember password
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <Link href="/auth/password/forgot">
                          <a className="btn btn-outline-danger btn-sm">
                            Forgot Password
                          </a>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
