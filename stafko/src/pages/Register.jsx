import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Login.css";
import Header from "../components/login_components/Header.jsx";
import Footer from "../components/login_components/Footer.jsx";
import { registerUser } from "../utils/login_calls/LoginCalls.js";

export default function Register({ username, setUsername }) {
  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    registerUser({username, pass, email, navigate, setError});
  };

  return (
    <div className="bg-div">
      <Header />
      <div className="main-div">
        <form onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          <img
            className="icon-img"
            src="src/assets/user_images/user-icon.png"
            alt="user-icon"
          />
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={30}
          />
          <br />
          <img
            className="icon-img"
            src="src/assets/user_images/password-icon.png"
            alt="password-icon"
          />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={50}
          />
          <br />
          <img
            className="icon-img"
            src="src/assets/user_images/email-icon.png"
            alt="email-icon"
          />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={50}
          />
          <br />
          <div className="checkbox-container">
            <input name="checkbox-input" type="checkbox" id="cbox" required />
            <label htmlFor="cbox">I accept the terms and conditions of the application.</label>
          </div>
          <br />

          <input
            className="register-submit"
            type="submit"
            value="Create account"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            Already registered?&nbsp;
            <Link to="/" className="register-link">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
