import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container container-custom mt-4">{children}</div>
      <Footer />
    </React.Fragment>
  );
};
export default Layout;
