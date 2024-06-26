import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
function Header({ isAuthenticated, setIsAuthenticated, setUser, user }) {
  const [show, setShow] = useState(false);
  const handleLogout = async () => {
    // await axios
    //   .get("http://localhost:4000/api/v1/user/patient/logout", {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     setIsAuthenticated(false);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logout successful!");
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };
  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
}

export default Header;
