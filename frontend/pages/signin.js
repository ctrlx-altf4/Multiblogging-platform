//library
import { useEffect } from "react";
//components
import Layout from "../components/Layout";
import SignInComponent from "../components/Auth/SignIn.components";
import { isAuth } from "../actions/auth";
import { withRouter } from "next/router";
const signin = ({ router }) => {
  //   useEffect(() => {
  //     const isLoggedIn = isAuth();
  //     if (!!isLoggedIn) {
  //       Router.push("/");
  //     }
  //   }, [isAuth]);

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else return;
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
        </div>
        <div className="row">
          <div className="col-md-12 ">
            <SignInComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default withRouter(signin);
