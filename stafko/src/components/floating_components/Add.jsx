import React, { useState, useEffect } from "react";
import "./styles/Add.css";
import {
  addUser,
  createStaffProject,
  fetchCustomers,
  fetchOwner,
  fetchUsers,
} from "../../utils/api_calls/ApiCalls";

export default function Add({
  selectedUsers,
  setSelectedUsers,
  projectOwner,
  setProjectOwner,
}) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectFile, setProjectFile] = useState(null);
  const [projectCustomer, setProjectCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchCustomers(setCustomers);
    fetchOwner({ projectOwner, setProjectOwner });
    fetchUsers(setUsers, projectOwner);
    autoAddOwnerToCollaborators();
  }, []);

  async function autoAddOwnerToCollaborators() {
    try {
      if (!selectedUsers.some((user) => user.username === username)) {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff?filter[username][_eq]=${username}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.data.length > 0) {
            const ownerStaffId = data.data[0].staff_id;
            setSelectedUsers((prevUsers) => [
              ...prevUsers,
              { username, id: ownerStaffId },
            ]);
          }
        }
      } else {
        console.log("Owner already exists in the list of collaborators.");
      }
    } catch (error) {
      console.error("Failed to fetch project owner: ", error);
    }
  }

  const handleStaffProject = (staffId, projectId) => {
    createStaffProject({ staffId, projectId });
  };

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DIRECTUS}/files`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.data.id;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors[0].message);
    }
  }

  async function addProject(event) {
    event.preventDefault();

    if (!projectName.trim()) {
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

    if (!projectCustomer) {
      setError("The project customer is required.");
      return;
    }

    if (projectFile === null) {
      setError("The project file is required.");
      return;
    }

    try {
      let projectFileId = null;

      if (projectFile) {
        projectFileId = await uploadFile(projectFile);
      }

      const projectData = {
        project_name: projectName,
        description: description,
        project_owner: projectOwner,
        associated_customer: projectCustomer,
        project_file: projectFileId
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(projectData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const projectId = data.data.project_id;
        console.log(projectId);
        for (let i = 0; i < selectedUsers.length; i++) {
          const staffId = selectedUsers[i].id;
          await handleStaffProject(staffId, projectId);
        }
        setSuccessMessage("Project created successfully.");
        setProjectName("");
        setDescription("");
        setProjectFile(null);
        setProjectCustomer("");
        setShouldReload(true);
      } else {
        const errorData = await response.json();
        setError(errorData.errors[0].message);
      }
    } catch (error) {
      console.error("Failed to create project: ", error);
    }
  }

  async function deleteUser(username) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  }

  function clearAll() {
    const userToKeep = localStorage.getItem("username");
    const confirmed = window.confirm(
      "Are you sure you want to clear all fields?"
    );
    if (confirmed) {
      setProjectName("");
      setDescription("");
      setProjectFile(null);
      setProjectCustomer("");

      setSelectedUsers((prevUsers) => {
        const filteredUsers = prevUsers.filter(
          (user) => user.username === userToKeep
        );
        return filteredUsers;
      });
      setSuccessMessage("All fields cleared.");
      setTimeout(function () {
        setSuccessMessage("");
      }, 3000);
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
        <h2 className="form-title">Add Project Form</h2>
        <div className="form-container">
          <img
            className="icon-img"
            src="src/assets/project_images/project-icon.png"
            alt="user-icon"
          />
          <label htmlFor="projectName" className="required">
            Project Name:
          </label>
          <br />
          <input
            type="text"
            id="projectname"
            name="projectname"
            className="project-name-input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxLength={50}
            required
          />
          <br />
          <img
            className="icon-img"
            src="src/assets/project_images/description-icon.png"
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
            src="src/assets/project_images/deal-icon.png"
            alt="user-icon"
          />
          <label htmlFor="projectCustomer" className="required">
            Project Customer:
          </label>
          <br />
          <select
            name="customers"
            id="customers"
            className="select-customer"
            value={projectCustomer}
            onChange={(e) => setProjectCustomer(e.target.value)}
            required
          >
            <option>Select customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.customer_name}
              </option>
            ))}
          </select>

          <br />
          <img
            className="icon-img"
            src="src/assets/project_images/staff-icon.png"
            alt="desc-icon"
          />
          <label htmlFor="projectStaff" className="required">
            Project Staff:
          </label>
          <br />
          <select name="users" id="users" className="select-user">
            {users.map((user) => (
              <option key={user.staff_id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <button
            className="add-user-button"
            type="button"
            onClick={() => addUser(selectedUsers, setSelectedUsers)}
          >
            Add user
          </button>
          <br />
          <p>Users Selected:</p>
          <div className="list-div-bar"></div>
          {selectedUsers.length > 0 && (
            <div className="users-added-div">
              <ul>
                {selectedUsers.map((user, index) => (
                  <li key={index}>
                    - {user.username}
                    {user.username === username ? null : (
                      <button
                        type="button"
                        onClick={() => deleteUser(user.username)}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="list-div-bar"></div>
          <img
            className="icon-img"
            src="src/assets/project_images/files-icon.png"
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
        </div>
        <div className="bottom-buttons">
          <input
            className="add-project-input"
            type="submit"
            id="addProject"
            name="addProject"
            value="Add project"
          />
          <button type="button" className="clear-all-button" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </form>
    </div>
  );
}
