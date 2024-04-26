import React, { useState, useEffect } from "react";
import "./styles/Add.css";

export default function Add({ selectedUsers, setSelectedUsers }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectFile, setProjectFile] = useState(null);
  const [projectCustomer, setProjectCustomer] = useState("");
  const [projectOwner, setProjectOwner] = useState();
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staff`
        );
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
    async function fetchCustomers() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/customers`
        );
        if (response.ok) {
          const customerData = await response.json();
          setCustomers(customerData);
        }
      } catch (error) {
        console.error("Failed to fetch customers: ", error);
      }
    }

    fetchCustomers();
  }, []);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/staff/username/${localStorage.getItem("username")}`
        );
        if (response.ok) {
          const data = await response.json();
          setProjectOwner(data.staff_id);
          await autoAddOwnerToCollaborators();
        }
      } catch (error) {
        console.error("Failed to fetch project owner: ", error);
      }
    }

    fetchOwner();
  }, []);

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
      const formData = new FormData();
      formData.append("project_name", projectName);
      formData.append("description", description);
      formData.append("project_owner", projectOwner);
      formData.append("associated_customer", projectCustomer);
      formData.append("project_file", projectFile);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/projects`,
        {
          method: "POST",
          body: formData,
        }
      );

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
          `${import.meta.env.VITE_BACKEND_URL}/staff/username/${selectedUser}`
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

  async function autoAddOwnerToCollaborators() {
    try {
      if (
        !selectedUsers.some(
          (user) => user.username === localStorage.getItem("username")
        )
      ) {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/staff/username/${localStorage.getItem("username")}`
        );
        if (response.ok) {
          const data = await response.json();
          const ownerStaffId = data.staff_id;
          const ownerUsername = data.username;
          setSelectedUsers((prevUsers) => [
            ...prevUsers,
            { username: ownerUsername, id: ownerStaffId },
          ]);
        }
      } else {
        console.log("Owner already exists in the list of collaborators.");
      }
    } catch (error) {
      console.error("Failed to fetch project owner: ", error);
    }
  }

  async function createStaffProject(projectId, staffId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/staffProject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            staff_id: staffId,
            project_id: projectId,
          }),
        }
      );
      if (response.ok) {
        console.log("User-project relation created.");
      } else {
        console.log("User-project error.");
      }
    } catch (error) {
      console.error("An error has occurred: ", error);
    }
  }

  function clearAll() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all fields?"
    );
    if (confirmed) {
      setProjectName("");
      setDescription("");
      setProjectFile(null);
      setProjectCustomer("");

      setSelectedUsers((prevUsers) => {
        const userToKeep = localStorage.getItem("username");
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
          <label htmlFor="projectDesc">
            Project Description:
          </label>
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
            <option>Select user</option>
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
                {selectedUsers.map((user, index) => (
                  <li key={user.id}>
                    - {user.username}
                    {user.username !== localStorage.getItem("username") && (
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
          <label htmlFor="projectFile" className="required">
            Project File:
          </label>
          <br />
          <input
            type="file"
            id="projectfile"
            name="projectfile"
            onChange={(e) => setProjectFile(e.target.files[0])}
            required
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
        </div>
      </form>
    </div>
  );
  
}
