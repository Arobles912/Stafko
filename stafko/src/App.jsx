import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <Router>
        <div>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div>
          <Header />
          <main>
            <Routes>
              <Route
                path="/"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
