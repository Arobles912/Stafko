import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
//import { refreshAccessToken } from "./utils/login_calls/LoginCalls";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    //const refreshTokenFromStorage = localStorage.getItem("refreshToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                email={email}
                setEmail={setEmail}
              />
            )
          }
        />
        <Route
          path="/register"
          element={<Register email={email} setEmail={setEmail} />}
        />
        <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
