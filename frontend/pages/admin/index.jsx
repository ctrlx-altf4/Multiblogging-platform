//components
import Layout from "../../components/Layout";
import Admin from "../../components/Auth/Admin";
import Link from "next/link";
import Header from "../../components/Header";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

import {
  FaTags,
  FaList,
  FiEdit,
  FaEdit,
  FaUser,
  FaRetweet,
} from "react-icons/fa";
const index = () => {
  return (
    <Admin>
      <div className="container-fluid">
        <div className="row">
          <div className=" sidebar col-md-2">
            <div className="sidebar-content">
              <div className="sidebar-brand">
                Logo Here
                <div id="close-sidebar">
                  also
                  <i class="fas fa-times"></i>
                </div>
              </div>
              <hr className="bg-white" />
              <div class="sidebar-header">
                <div class="user-pic">
                  <img
                    class="img-responsive img-rounded"
                    src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                    alt="User picture"
                  />
                </div>
                <div class="user-info">
                  <span class="user-name">
                    Jhon
                    <strong>Smith</strong>
                  </span>
                  <span class="user-role">Administrator</span>
                  <span class="user-status">
                    <div>x</div>
                    <span>Online</span>
                  </span>
                </div>
              </div>
              <hr className="bg-white" />
              <ul className="list-group">
                <li className="bg-transparent border-0 list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a className="text-light">
                      {" "}
                      <FaList className="icon-custom" />
                      Create Cateogry
                    </a>
                  </Link>
                </li>
                <li className="bg-transparent border-0 list-group-item">
                  <a className="text-light" href="/admin/crud/category-tag">
                    <FaTags className="icon-custom" />
                    Create Tags
                  </a>
                </li>
                <li className="bg-transparent list-group-item">
                  <Link href="/admin/crud/blog">
                    <a className="text-light">
                      <FaEdit className="icon-custom" />
                      Create Blog
                    </a>
                  </Link>
                </li>
                <li className="bg-transparent border-0 list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a className="text-light">
                      <FaRetweet className="icon-custom" />
                      Update Blog
                    </a>
                  </Link>
                </li>
                <li className="bg-transparent border-0 list-group-item">
                  <Link href="/user/update">
                    <a className="text-light">
                      <FaUser className="icon-custom" />
                      Update Profile
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sidebar-footer"></div>
          </div>
          <div className="px-0 col-md-10">
            <Header />
            <ProfileUpdate />
          </div>
        </div>
      </div>
    </Admin>
  );
};
export default index;
