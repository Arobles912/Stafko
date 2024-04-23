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
  setSearchTerm,
  isMobileNavbarVisible,
  setIsMobileNavbarVisible,
}) {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      setToken(null);
      localStorage.removeItem("token");
      setUsername("");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleMobileNavbar = () => {
    setIsMobileNavbarVisible(!isMobileNavbarVisible);
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
      <div className="logo-container">
        <img
          className="navbar-logo"
          src="src/assets/example-logo.png"
          alt="example-logo"
        />
        <h3>Stafko</h3>
      </div>
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
        <img
          className="search-bar-icon"
          src="src/assets/search-icon2.png"
          alt="search-icon"
          onClick={toggleMobileNavbar}
        ></img>
        <img
          className="user-icon-img"
          src="src/assets/user-icon.png"
          alt="user-icon"
          onClick={toggleMenu}
          ref={dropdownRef}
        ></img>
        <p className="user-name" onClick={toggleMenu} ref={dropdownRef}>
          Logged as: {username}
        </p>
        <div className={menuVisible ? "dropdown-container show" : "dropdown-container"}>
        <div
          className={menuVisible ? "dropdown-content show" : "dropdown-content"}
        >
          <div>
            <img src="src/assets/user-icon.png" alt="user-icon"></img>
            <span>{username}</span>
          </div>
          <hr />
          <div className="dropdown-link-div">
            <img src="src/assets/user-icon2.png" alt="user-icon"></img>
            <a href="">Profile</a>
          </div>
          <div className="dropdown-link-div">
            <img src="src/assets/project-icon2.png" alt="user-icon"></img>
            <a href="">Your projects</a>
          </div>
          <div className="dropdown-link-div">
            <img src="src/assets/friends-icon.png" alt="user-icon"></img>
            <a href="">Friends</a>
          </div>
          <div className="dropdown-link-div">
            <img src="src/assets/settings-icon.png" alt="user-icon"></img>
            <a href="">Settings</a>
          </div>
          <button name="logoutbutton" onClick={handleLogout}>
            Logout
          </button>
        </div>
        </div>
      </div>
    </nav>
  );
}
