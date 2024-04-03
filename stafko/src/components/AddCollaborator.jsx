import { useState, useEffect } from "react";
import "./styles/AddCollaborator.css";

export default function AddCollaborator({setIsAddCollaboratorVisible}) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:4000/api/staff");
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

  async function deleteUser(username) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  }

  async function addUser() {
    const userSelect = document.getElementById("users");
    const selectedUser = userSelect.value;
    if (selectedUsers.some((user) => user.username === selectedUser)) {
      console.log("User already exists in the list.");
    } else {
      try {
        const response = await fetch(
          `http://localhost:4000/api/staff/username/${selectedUser}`
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

  return (
    <div className="main-add-collaborator-div">
      <div className="add-collaborator-div">
        <div className="close-div">
          <button type="button" onClick={() => setIsAddCollaboratorVisible(false)}>X</button>
        </div>
        <h3>Add collaborators</h3>
        <div className="collaborators-list">
          <select name="users" id="users" className="select-collaborator">
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
                  <li key={index}>
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
        </div>
      </div>
    </div>
  );
}
