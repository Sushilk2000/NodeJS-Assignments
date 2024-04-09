import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ isAuthenticated, setIsAuthenticated, setUser, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://hospital-management-q6tl.onrender.com/api/v1/user/loginuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.user.role === "admin") {
          console.log("it is an admin");
          setIsAuthenticated(true);
          setUser(data.user);
          nav("/");
        } else {
          toast.error("Only admins are authorized to access");
        }
      } else {
        if (response.status === 401) {
          toast.error("Invalid email or password");
        } else {
          toast.error("Login failed. Please try again later.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isAuthenticated) {
    return nav("/");
  }
  return (
    <>
      <div className="container form-component login-form">
        <img src="/public/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">Welcome to ZeeCare</h1>
        <p>Only admins are authorized to access</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
