// src/pages/Home.js
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <h1>Welcome to SmartHire</h1>
      <p>Please login or register to continue.</p>
      <Link to="/login" className="home-btn">Login</Link>
      <Link to="/register" className="home-btn">Register</Link>
    </div>
  );
}
