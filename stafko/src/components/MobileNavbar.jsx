import { useState, useEffect } from "react";
import "./styles/MobileNavbar.css";

export default function MobileNavbar({
  setSearchTerm,
  isMobileNavbarVisible,
  setIsMobileNavbarVisible,
}) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickOutside = (event) => {
    const dropdownRef = document.querySelector(".mobile-navbar");
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setIsMobileNavbarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="navbar-container">
      <nav
        className={`mobile-navbar ${
          isMobileNavbarVisible ? "show-navbar" : ""
        }`}
      >
        <div className="search-bar-div-mobile">
          <input
            type="text"
            id="searchbar"
            name="searchbar"
            className="search-bar-input-mobile"
            placeholder="Search project..."
            onChange={handleSearchChange}
          />
        </div>
      </nav>
    </div>
  );
}
