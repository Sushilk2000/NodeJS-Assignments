import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/header";
import Hero from "./Components/Hero";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/About";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState();

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
}

export default App;
