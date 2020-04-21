//library
import { useEffect } from "react";
//components
import Layout from "../components/Layout";
import SignInComponent from "../components/Auth/SignIn.components";
import { isAuth } from "../actions/auth";
import Router from "next/router";
const signin = () => {
  //   useEffect(() => {
  //     const isLoggedIn = isAuth();
  //     if (!!isLoggedIn) {
  //       Router.push("/");
  //     }
  //   }, [isAuth]);
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Sign In</h1>
      <div className="row mr-0 ml-0">
        <div className="col-md-6 offset-md-3 ">
          <SignInComponent />
        </div>
      </div>
    </Layout>
  );
};
export default signin;
