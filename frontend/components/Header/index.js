//library
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
} from "reactstrap";

import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

import { FaPhoneAlt, FaEnvelope, FaEdit } from "react-icons/fa";
import Search from "../blog/Search";

//actions
import { isAuth, signOutAction } from "../../actions/auth";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <div className="bg-primary small clearfix" style={{ padding: ".5rem" }}>
        <div className="container container-custom">
          <div className="text-white float-left">
            Questions?
            <a className="text-light" href="tel:9844697839">
              <FaPhoneAlt className="icon-custom" /> 9844697839
            </a>
          </div>

          <div className="float-right">
            <a className="text-light" href="tel:9844697839">
              <FaEnvelope className="icon-custom" /> ctrlx.altf4@gmail.com
            </a>
          </div>
        </div>
      </div>

      <Navbar color="light" light expand="md">
        <div className="container container-custom">
          <Link href="/">
            <NavLink className="font-weight-bold pl-0">LOGO HERE</NavLink>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link href="/blogs">
                  <NavLink className="text-dark">Blogs</NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/contact">
                  <NavLink className="text-dark">Contact</NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/user/crud/blog">
                  <NavLink
                    className="btn btn-primary "
                    style={{ background: "#00e5ff", color: "black" }}
                  >
                    <FaEdit className="icon-custom" />
                    Write a Blog
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
            <Nav>
              {isAuth() && isAuth().role === 0 && (
                <NavItem>
                  <Link href="/user">
                    <NavLink className="text-dark">{isAuth().name}</NavLink>
                  </Link>
                </NavItem>
              )}
              {isAuth() && isAuth().role === 1 && (
                <NavItem>
                  <Link href="/admin">
                    <NavLink className="text-dark">{isAuth().name}</NavLink>
                  </Link>
                </NavItem>
              )}
              {isAuth() && (
                <React.Fragment>
                  <NavItem>
                    <NavLink
                      className="text-dark"
                      onClick={() =>
                        signOutAction(() => Router.replace("/signin"))
                      }
                    >
                      Sign Out
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
              {!isAuth() && (
                <React.Fragment>
                  <NavItem>
                    <Link href="/signin">
                      <NavLink className="text-dark">Sign In</NavLink>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/signup">
                      <NavLink className="text-dark">Sign Up</NavLink>
                    </Link>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;
