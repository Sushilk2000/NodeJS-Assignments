import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:10000/api/v1/user/loginUser",

        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setIsAuthenticated(true);
      nav("/");
    } catch (error) {
      console.log(error);
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
