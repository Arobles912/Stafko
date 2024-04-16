import React, { useState, useEffect } from "react";
import "./styles/EditProjectName.css";

export default function EditProjectName({ setIsEditProjectName, project }) {
  const [projectName, setProjectName] = useState(project.project.project_name);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  async function handleConfirm() {
    const confirmed = window.confirm(
      "Are you sure you want to confirm the changes?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${project.project.project_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              project_name: projectName,
            }),
          }
        );
        if (response.ok) {
            console.log("Project name updated succesfully.");
            setShouldReload(true);
            return true;
          } else {
            console.log("Project name couldn't be updated.");
            return false;
          }
      } catch (error) {
        console.log("Couldn't update the project name: ", error);
      }
    }
  }

  return (
    <div className="main-edit-project-name-div">
      <div className="edit-project-name-div">
        <div className="close-div">
          <button type="button" onClick={() => setIsEditProjectName(false)}>
            X
          </button>
        </div>
        <h3>Edit project name</h3>
        <input
          type="text"
          id="projectnameinput"
          name="projectnameinput"
          className="project-name-input"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          maxLength={50}
        />
        <br />
        <button
          type="button"
          className="confirm-button"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
