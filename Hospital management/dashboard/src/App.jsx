import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import AddNewDoctor from "./Components/AddNewDoctor";
import AddNewAdmin from "./Components/AddNewAdmin";
import Messages from "./Components/Messsages";
import Doctors from "./Components/Doctors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;