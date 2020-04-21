//library
import { useState } from "react";

//components

//styles

//actions
import { signupAction } from "../../actions/auth";

const SignUpComponent = () => {
  const init = {
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  };
  const [values, setValues] = useState(init);
  const { name, email, password, error, loading, message, showForm } = values;

  const showLoading = () =>
    loading && <div className="alert alert-info">loading...</div>;
  const showMessage = () =>
    message && <div className="alert alert-info">{message}</div>;
  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    signupAction(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...init, message: data.message, showForm: false });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, error: false, [name]: value });
    console.log(name + " " + value);
  };
  const SignUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            type="text"
            value={name}
            className="form-control"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
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
            Sign up
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
      {showForm && SignUpForm()}
    </React.Fragment>
  );
};
export default SignUpComponent;
