import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          pass,
          email,
        }),
      });

      if (response.ok) {
        console.log("User registered successfully");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register user. Please try again later.");
    }
  };

  return (
    <div className="main-div">
      <form onSubmit={handleRegister}>
        <h2>Sign Up</h2>
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
        />
        <br />
        <img
          className="icon-img"
          src="src/assets/password-icon.png"
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
        />
        <br />
        <img
          className="icon-img"
          src="src/assets/email-icon.png"
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
        />
        <br />
        <input
          className="register-submit"
          type="submit"
          value="Create account"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          Already registered?&nbsp;
          <Link to="/" className="register-link">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
