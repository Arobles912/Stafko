import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const staffDataURL = "http://localhost:3000/staff";

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(staffDataURL);
      const staffData = await response.json();

      const userExists = staffData.some(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        console.log("Login successful.");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="main-div">
      <form onSubmit={handleLogin}>
        <h2>Welcome</h2>
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
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input className="submit" type="submit" value="Login" />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Don't have an account?&nbsp;<a href="/">Register here</a>
        </p>
      </form>
    </div>
  );
}
