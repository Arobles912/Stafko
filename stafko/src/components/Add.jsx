import "./styles/Add.css";

export default function Add() {
  return (
    <div className="main-add-div">
      <form className="add-form">
        <img
          className="icon-img"
          src="src/assets/project-icon.png"
          alt="user-icon"
        />
        <label htmlFor="projectName">Project Name:</label>
        <br />
        <input type="text" id="projectname" name="projectname" className="project-name-input"/>
        <br />
        <img
          className="icon-img"
          src="src/assets/staff-icon.png"
          alt="user-icon"
        />
        <label htmlFor="projectStaff">Project Staff:</label>
        <br />
        <select name="Users:" id="users" className="select-user">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <button className="add-user-button">Add user</button>
        <br />
        <img
          className="icon-img"
          src="src/assets/files-icon.png"
          alt="user-icon"
        />
        <label htmlFor="projectFile">Project File:</label>
        <br />
        <input type="file" id="projectfile" name="projectfile" />
        <br />
        <input
          className="add-project-input"
          type="submit"
          id="addProject"
          name="addProject"
          value="Add project"
        />
      </form>
    </div>
  );
}
