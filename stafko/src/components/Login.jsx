import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Login({ setIsLoggedIn, username, setUsername }) {
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pass,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); 
        localStorage.setItem("username", data.username);
        setIsLoggedIn(true);
      } else {
        const data = await response.json();
        setError(data.message || "Incorrect username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Failed to log user. Please try again later.");
    }
  };

  return (
      <div className="bg-div">
        <Header />
        <div className="main-div">
          <form onSubmit={handleLogin}>
            <h2>Welcome</h2>
            <img
              className="icon-img"
              src="src/assets/user-icon.png"
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
              src="src/assets/password-icon.png"
              alt="user-icon"
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
            <input className="submit" type="submit" value="Login" />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
              Don't have an account?&nbsp;
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
  );
}
