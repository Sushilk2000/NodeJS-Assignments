import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
function Login({ isAuthenticated, setIsAuthenticated }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
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
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Log in to Continue</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          id="email"
          value={emailRef.current.value}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          value={passwordRef.current.value}
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
