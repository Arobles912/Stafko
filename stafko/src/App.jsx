import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./Home";
import Add from "./components/Add";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername}/>
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home username={username}/>} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
