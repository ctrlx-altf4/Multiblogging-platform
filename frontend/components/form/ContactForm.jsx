import { useState } from "react";
import Link from "next/Link";
import { emailContactForm } from "../../actions/form";

const ContactForm = () => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          error: "",
          name: "",
          message: "",
          email: "",
          button: "Sent",
          success: data.success,
        });
      }
    });
  };
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      succes: false,
      buttonText: "Send Message",
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thank you for Contacting us</div>
    );

  const showErrorMessage = () =>
    error && (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            type="text"
            className="form-control"
            value={message}
            required
            rows="10"
          ></textarea>
        </div>
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control"
            value={email}
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showErrorMessage()}
      {showSuccessMessage()}
      {contactForm()}
    </>
  );
};
export default ContactForm;
