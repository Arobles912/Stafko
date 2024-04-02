import React, { useState, useEffect, useRef } from "react";
import "./styles/ProjectCard.css";

export default function ProjectCard({ project }) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [description, setDescription] = useState(project.project.description);
  const [staffProjectsData, setStaffProjectsData] = useState(null);
  const [collaborators, setCollaborators] = useState([]);

  const textareaRef = useRef(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const staffProjectsResponse = await fetch(
          `http://localhost:4000/api/staffProject/project/${project.staffProject.project_id}`
        );
        if (staffProjectsResponse.ok) {
          const data = await staffProjectsResponse.json();
          setStaffProjectsData(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error has occurred:", error);
      }
    }

    fetchData();
  }, [project.project_id]);

  useEffect(() => {
    async function fetchCollaborators() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/staffProject/project/${project.staffProject.project_id}/users`
        );
        if (response.ok) {
          const data = await response.json();
          setCollaborators(data);
        } else {
          throw new Error("Failed to fetch collaborators");
        }
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    }

    fetchCollaborators();
  }, [project.staffProject.project_id]);
  

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  async function deleteProject() {
    let staffProjectData;

    try {
      const response = await fetch(
        `http://localhost:4000/api/staffProject/project/${project.staffProject.project_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete staff project");
      }

      staffProjectData = { ...project };

      const projectResponse = await fetch(
        `http://localhost:4000/api/projects/${project.project.project_id}`,
        {
          method: "DELETE",
        }
      );

      if (!projectResponse.ok) {
        throw new Error("Failed to delete project");
      }
      console.log("Project deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("An error has occurred:", error);

      if (staffProjectData) {
        try {
          const restoreResponse = await fetch(
            `http://localhost:4000/api/projects`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(staffProjectData),
            }
          );

          if (restoreResponse.ok) {
            console.log("Project restored successfully.");
          } else {
            throw new Error("Failed to restore project");
          }
        } catch (error) {
          console.error("Error restoring project:", error);
        }
      }
    }
  }

  function handleEditButton() {
    setExtendedCard(!extendedCard);
    setEditButtonText(extendedCard ? "Edit" : "Cancel");
  }

  async function saveChanges() {
    try {
      const response = await fetch(`http://localhost:4000/api/projects/${project.project.project_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      });
      console.log("Description updated:", description);
    } catch (error) {
      console.error("Error updating the description:", error);
    }
  }

  const projectDate = project.project.creation_date.substring(0, 10);

  const numberOfCollaborators = staffProjectsData
    ? staffProjectsData.length
    : 0;

  return (
    <div className="main-container-div">
      <div className="container-div">
        <section className="project-card-main-div">
          <div className="title-div">
          <img src="src/assets/project-icon.png" alt="project-img"></img>
          <h1>{project.project.project_name}</h1>
          </div>
          <div className="info-div">
            <p>Numero de miembros: {numberOfCollaborators}</p>
          </div>
          <div className="info-div">
            <p>Creation date: {projectDate}</p>
          </div>
          <button className="edit-button" onClick={handleEditButton}>
            {editButtonText}
          </button>
          <button className="download-button">Download File</button>
        </section>
        <section
          className={`project-cardEx-main-div ${
            extendedCard ? "extended" : ""
          }`}
        >
          <div className="description-div">
            <h3>Readme</h3>
            <hr />
            <textarea
              ref={textareaRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6" 
              onFocus={adjustTextareaHeight} 
            />
          </div>
          <div className="user-list">
            <h3>Colaborators</h3>
            <hr />
            {collaborators.map((collaborator, index) => (
              <div className="user-card" key={index}>
                <div>
                  <img src="src/assets/user-icon.png" alt="colaborators-icon" />
                  <span>{collaborator}</span>
                </div>
                <button>Delete collaborator</button>
              </div>
            ))}
          </div>
          <div className="buttons-div">

            <button onClick={deleteProject} className="delete-button">
              Delete project
            </button>
            <button onClick={saveChanges} className="save-button">
              Save changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
