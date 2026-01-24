import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

export default function App() {
  return (
    <div>
     
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
        <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
        <Link to="/profile" style={{ margin: "0 10px" }}>Profile</Link>
      </nav>

     
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
    
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

