//components
import Layout from "../components/Layout";
import SignUpComponent from "../components/Auth/SignUp.components";
const signup = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Sign Up</h1>
      <div className="row mr-0 ml-0">
        <div className="col-md-6 offset-md-3 ">
          <SignUpComponent />
        </div>
      </div>
    </Layout>
  );
};
export default signup;
