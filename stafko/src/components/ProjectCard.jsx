import "./styles/ProjectCard.css";
import { useState, useEffect } from "react";

export default function ProjectCard({ key, project }) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [staffProjectsData, setStaffProjectsData] = useState(null);
  const [collaborators, setCollaborators] = useState([]);

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
        console.error("An error has ocurred:", error);
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

  async function deleteProject() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/projects/${project.staffProject.project_id}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        console.log("Project deleted succesfully.");
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
  

  function handleEditButton() {
    setExtendedCard(!extendedCard);
    setEditButtonText(extendedCard ? "Edit" : "Cancel");
  }

  const projectDate = project.project.creation_date.substring(0, 10);

  const numberOfCollaborators = staffProjectsData ? staffProjectsData.length : 0;

  console.log(collaborators);

  return (
    <div className="main-container-div">
      <div className="container-div">
        <section className="project-card-main-div">
          <img src="src/assets/project-icon.png" alt="project-img"></img>
          <h1>{project.project.project_name}</h1>
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
            <p>
              Descripción: <span>{project.project.description}</span>
            </p>
          </div>
          <div className="user-list">
            <h3>Colaborators</h3>
            <hr />
            {collaborators.map((collaborator, index) => (
              <div className="user-card" key={index}>
                <img
                  src="src/assets/user-icon.png"
                  alt="colaborators-icon"
                />
                <span>{collaborator}</span>
              </div>
            ))}
          </div>
          <button onClick={deleteProject} className="delete-button">Delete project</button>
        </section>
      </div>
    </div>
  );
}
