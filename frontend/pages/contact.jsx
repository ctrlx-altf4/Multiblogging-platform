//components
import Layout from "../components/Layout";
import ContactForm from "../components/form/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-offset-8">
            <h2>Contact Form</h2>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Contact;
