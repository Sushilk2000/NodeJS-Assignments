import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ isAuthenticated, setIsAuthenticated, setUser, user }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hospital-management-q6tl.onrender.com/api/v1/user/loginuser",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json;
      if (data.token) {
        setIsAuthenticated(true);
        localStorage.setItem("patientToken", data.token);
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Log in to Continue</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          placeholder="******"
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
