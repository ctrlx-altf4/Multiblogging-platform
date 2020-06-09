import { FaFacebook, FaTwitter, FaGoogle, FaGooglePlusG } from "react-icons/fa";
import { Navbar } from "reactstrap";
import Setup from "./Setup";

const Footer = () => {
  return (
    <div>
      <Navbar
        color="light"
        light
        expand="md"
        className="page-footer font-small special-color-dark pt-4"
      >
        {/**Todo @samasizworld Hide this  on mobile view */}
        <div className="container">
          <ul className="list-unstyled text-center">
            <li className="list-inline-item">
              <a className="btn-floating btn-fb mx-1">
                <FaFacebook />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1">
                <FaTwitter />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="mx-1">
                <FaGooglePlusG />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="https://refreshNepal.com/"> RefreshMent Nepal</a>
        </div>
      </Navbar>
      <div
        container
        className="bottom-bar d-flex justify-content-between align-items-center"
      >
        {Setup.map((item) => (
          <div
            key={item.title}
            item
            onClick={() => {
              history.push(item.onClickHistoryPush);
            }}
          >
            <center>
              <item.logoIcon
                className={`${item.title === "Add" ? "h1 text-primary" : "h3"}`}
              />
              {/* <p>{item.title !== "Add" && item.title}</p> */}
            </center>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Footer;
