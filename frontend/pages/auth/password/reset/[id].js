import { useState } from "react";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";

import { resetPassword } from "../../../../actions/auth";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    message: "",
    error: "",
    showForm: true,
  });

  const { name, newPassword, message, error, showForm } = values;

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, mesage: "", error: "", [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: "",
        });
      } else
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: "",
          error: false,
        });
    });
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showMessage = () =>
    message && <div className="alert alert-success">{message}</div>;

  const passwordResetForm = () => (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            className="form-control"
            value={newPassword}
            palceholder="Type new Password "
            required
          />
        </div>
        <div>
          <button className="btn btn-primary"> Change Password </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <div className="container">
        <h2>Reset Password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
