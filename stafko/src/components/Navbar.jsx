import "./styles/Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  username,
  toggleAddProject,
  setIsLoggedIn,
  addButtonText,
  setToken,
  setUsername
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

  return (
    <nav>
      <img src="src/assets/example-logo.png" alt="example-logo" />
      <h3>Stafko</h3>
      <div className="separation-div"></div>
      <button onClick={toggleAddProject} className="nav-link">
        {addButtonText}
      </button>
      <div className="right-side-div">
        <img src="src/assets/user-icon.png" alt="user-icon"></img>
        <p className="user-name">Logged as: {username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
