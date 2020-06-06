import { FaFacebook, FaTwitter, FaGoogle, FaGooglePlusG } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="page-footer font-small special-color-dark pt-4"
      style={{ background: "#116466" }}
    >
      <div className="container">
        <ul className="list-unstyled text-center">
          <li className="list-inline-item">
            <a className="btn-floating btn-fb mx-1">
              <FaFacebook />
              {/* <i className="fab fa-facebook-f"> </i> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-tw mx-1">
              <FaTwitter />
              {/* <i className="fab fa-twitter"> </i> */}
            </a>
          </li>
          <li className="list-inline-item">
            <a className="mx-1">
              <FaGooglePlusG />
              {/* <i className="fab fa-google-plus-g"> </i> */}
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="https://refreshNepal.com/"> RefreshMent Nepal</a>
      </div>
    </footer>
  );
};
export default Footer;
