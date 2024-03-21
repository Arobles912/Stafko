import "./styles/Navbar.css";

export default function Navbar({username, toggleAddProject}) {
  return (
    <nav>
      <img src="src/assets/example-logo.png" alt="example-logo"/>
      <h3>Stafko</h3>
      <div className="separation-div"></div>
      <button onClick={toggleAddProject} className="nav-link">Add project</button>
      <div className="right-side-div">
      <p className="user-name">Logged as: {username}</p>
      <button>Logout</button>
      </div>
    </nav>
  );
}
