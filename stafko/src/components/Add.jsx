import React, { useState, useEffect } from "react";
import "./styles/Add.css";

export default function Add() {
  const [project_name, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [project_file, setProjectFile] = useState(null);
  const [project_owner, setProjectOwner] = useState(localStorage.getItem("username"));
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/api/staff");
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        }
      } catch (error) {
        console.error("Failed to fetch users: ", error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/staff/username/${project_owner}`
        );
        if (response.ok) {
          const data = await response.json();
          setProjectOwner(data.staff_id); 
        }
      } catch (error) {
        console.error("Failed to fetch project owner: ", error);
      }
      
    }

    fetchOwner();
  }, []);


  async function addProject(event) {
    event.preventDefault();

    if (!project_name.trim()) {
      setError("The project name can't be empty.");
      return;
    }

    if (description.length > 3000) {
      setError("The project description can't be longer than 3000 characters.");
      return;
    }

    if (selectedUsers.length < 1) {
      setError("The users selected field can't be empty.");
      return;
    }

    if (project_file === null) {
      setError("The project file is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("project_name", project_name);
      formData.append("description", description);
      formData.append("project_owner", project_owner);
      formData.append("project_file", project_file);

      console.log("formData: ", formData);

      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const projectId = data.project_id;
        for (let i = 0; i < selectedUsers.length; i++) {
          const staffId = selectedUsers[i].id;
          await createStaffProject(projectId, staffId);
        }
        setSuccessMessage("Project created successfully.");
        setProjectName("");
        setDescription("");
        setProjectFile(null);
        setSelectedUsers([]);
        setShouldReload(true);
      }
    } catch (error) {
      console.error("Failed to create project: ", error);
    }
  }

  async function addUser() {
    const userSelect = document.getElementById("users");
    const selectedUser = userSelect.value;
    if (selectedUsers.some((user) => user.username === selectedUser)) {
      console.log("User already exists in the list.");
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/api/staff/username/${selectedUser}`
        );
        if (response.ok) {
          const userData = await response.json();
          const staffId = userData.staff_id;
          setSelectedUsers((prevUsers) => [
            ...prevUsers,
            { username: selectedUser, id: staffId },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch staff ID: ", error);
      }
    }
  }

  async function deleteUser(username) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  }

  async function createStaffProject(projectId, staffId) {
    try {
      const response = await fetch("http://localhost:3000/api/staffProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staff_id: staffId,
          project_id: projectId,
        }),
      });
      if (response.ok) {
        console.log("User-project relation created.");
      } else {
        console.log("User-project error.");
      }
    } catch (error) {
      console.error("An error has occurred: ", error);
    }
  }

  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => {
        setShouldReload(false);
        window.location.reload();
      }, 750);
    }
  }, [shouldReload]);

  return (
    <div className="main-add-div">
      <form
        className="add-form"
        onSubmit={addProject}
        encType="multipart/form-data"
      >
        <img
          className="icon-img"
          src="src/assets/project-icon.png"
          alt="user-icon"
        />
        <label htmlFor="projectName">Project Name:</label>
        <br />
        <input
          type="text"
          id="projectname"
          name="projectname"
          className="project-name-input"
          value={project_name}
          onChange={(e) => setProjectName(e.target.value)}
          maxLength={50}
        />
        <br />
        <img
          className="icon-img"
          src="src/assets/description-icon.png"
          alt="user-icon"
        />
        <label htmlFor="projectDesc">Project Description:</label>
        <br />
        <textarea
          id="projectdesc"
          name="projectdesc"
          className="project-desc-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={3000}
        />
        <br />
        <img
          className="icon-img"
          src="src/assets/staff-icon.png"
          alt="desc-icon"
        />
        <label htmlFor="projectStaff">Project Staff:</label>
        <br />
        <select name="users" id="users" className="select-user">
          {users.map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <button className="add-user-button" type="button" onClick={addUser}>
          Add user
        </button>
        <br />
        <p>Users Selected:</p>
        <div className="list-div-bar"></div>
        {selectedUsers.length > 0 && (
          <div className="users-added-div">
            <ul>
              {selectedUsers.map((user) => (
                <li key={user.id}>
                  -{user.username}
                  <button
                    type="button"
                    onClick={() => deleteUser(user.username)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="list-div-bar"></div>
        <img
          className="icon-img"
          src="src/assets/files-icon.png"
          alt="user-icon"
        />
        <label htmlFor="projectFile">Project File:</label>
        <br />
        <input
          type="file"
          id="projectfile"
          name="projectfile"
          onChange={(e) => setProjectFile(e.target.files[0])}
        />
        <br />
        {error && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p
              className="error-message"
              style={{
                color: "red",
                fontFamily: "Anek Gurmukhi, sans-serif",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              {error}
            </p>
          </div>
        )}
        {successMessage && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <p
              className="success-message"
              style={{
                color: "green",
                fontFamily: "Anek Gurmukhi, sans-serif",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              {successMessage}
            </p>
          </div>
        )}

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
