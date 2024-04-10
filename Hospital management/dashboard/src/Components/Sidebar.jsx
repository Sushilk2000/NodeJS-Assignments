import { useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Sidebar({ isAUthenticated, setIsAuthenticated }) {
  const [show, setShow] = useState(false);
  const handleLogout = async () => {
    await axios
      .get("http://localhost:10000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const nav = useNavigate();
  return (
    <>
      <nav
        className={show ? "show sidebar" : "sidebar"}
        style={!isAUthenticated ? { display: "none" } : { display: "flex" }}
      >
        <div className="links">
          <TiHome
            onClick={() => {
              nav("/");
              setShow(!show);
            }}
          />

          <AiFillMessage
            onClick={() => {
              nav("/Messsages");
              setShow(!show);
            }}
          />
          <IoPersonAddSharp
            onClick={() => {
              nav("/doctor/addnew");
              setShow(!show);
            }}
          />
          <MdAddModerator
            onClick={() => {
              nav("/admin/addnew");
              setShow(!show);
            }}
          />
          <FaUserDoctor
            onClick={() => {
              nav("/doctors");
              setShow(!show);
            }}
          />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAUthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
    </>
  );
}

export default Sidebar;
