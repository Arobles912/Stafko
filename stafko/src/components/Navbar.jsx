import React from "react";
import "./styles/Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  username,
  toggleAddProject,
  setIsLoggedIn,
  addButtonText,
  setToken,
  setUsername,
  setSearchTerm 
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUsername("");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav>
      <img src="src/assets/example-logo.png" alt="example-logo" />
      <h3>Stafko</h3>
      <div className="separation-div"></div>
      <button onClick={toggleAddProject} className="nav-link" name="addproject">
        {addButtonText}
      </button>
      <div className="search-bar-div">
        <input
          type="text"
          id="searchbar"
          name="searchbar"
          className="search-bar-input"
          placeholder="Search project..."
          onChange={handleSearchChange} 
        />
      </div>
      <div className="right-side-div">
        <img src="src/assets/user-icon.png" alt="user-icon"></img>
        <p className="user-name">Logged as: {username}</p>
        <button name="logoutbutton" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
