import React from "react";
import "./styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);


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
        <img src="src/assets/user-icon.png" alt="user-icon" onClick={toggleMenu} ref={dropdownRef}></img>
        <p className="user-name" onClick={toggleMenu} ref={dropdownRef}>Logged as: {username}</p>
        <div className={menuVisible ? "dropdown-content show" : "dropdown-content"}>
          <div>
        <img src="src/assets/user-icon.png" alt="user-icon"></img>
        <span>{username}</span>
        </div>
          <hr/>
          <a href="">Profile</a>
          <a href="">Your projects</a>
          <a href="">Friends</a>
          <a href="">Settings</a>
          <button name="logoutbutton" onClick={handleLogout}>Logout</button>

        </div>
      </div>
    </nav>
  );
}
