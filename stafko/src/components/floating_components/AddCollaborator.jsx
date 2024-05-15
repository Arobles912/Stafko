import { useState, useEffect } from "react";
import "./styles/AddCollaborator.css";
import { createStaffProject } from "../../utils/api_calls/ApiCalls";

export default function AddCollaborator({
  setIsAddCollaboratorVisible,
  collaborators,
  project,
}) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          const filteredUsers = userData.filter(
            (user) => !collaborators.includes(user.username)
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Failed to fetch users: ", error);
      }
    }

    fetchUsers();
  }, [collaborators, accessToken]);

  async function deleteUser(username) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  }

  async function addUser() {
    if (!selectedUser) return;

    if (selectedUsers.some((user) => user.username === selectedUser)) {
      console.log("User already exists in the list.");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff?filter=username=${selectedUser}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          const staffId = userData[0].staff_id;
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

  const handleCreateStaffProject = (staffId, projectId) => {
    return createStaffProject({ staffId, projectId }, accessToken);
  };

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload, accessToken]);

  async function handleConfirm() {
    const confirmed = window.confirm(
      "Are you sure you want to confirm the changes?"
    );
    if (confirmed) {
      try {
        const createProjectPromises = selectedUsers.map((user) =>
          handleCreateStaffProject(user.id, project.project.project_id)
        );
        const results = await Promise.all(createProjectPromises);
        const allSuccess = results.every((result) => result);
        if (allSuccess) {
          setShouldReload(true);
        } else {
          console.error("Error creating staff projects.");
        }
      } catch (error) {
        console.error("Error creating staff projects: ", error);
      }
    }
  }


  return (
    <div className="main-add-collaborator-div">
      <div className="add-collaborator-div">
        <div className="close-div">
          <button
            type="button"
            onClick={() => setIsAddCollaboratorVisible(false)}
          >
            X
          </button>
        </div>
        <h3>Add collaborators</h3>
        <div className="collaborators-list">
          <select
            name="users"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="select-collaborator"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.staff_id} value={user.username}>
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
                  <li key={index}>
                    <div className="user-container">
                      <span>-{user.username}</span>
                      <button
                        type="button"
                        onClick={() => deleteUser(user.username)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="list-div-bar"></div>
          <button
            type="button"
            className="confirm-button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
