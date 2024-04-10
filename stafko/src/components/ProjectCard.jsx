import React, { useState, useEffect, useRef } from "react";
import "./styles/ProjectCard.css";
import AddCollaborator from "./AddCollaborator";

export default function ProjectCard({ project }) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [isAddCollaboratorVisible, setIsAddCollaboratorVisible] =
    useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [description, setDescription] = useState(project.project.description);
  const [staffProjectsData, setStaffProjectsData] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [allCollaborators, setAllCollaborators] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setAllCollaborators(data);
          setLoading(false);
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

  function handleEditButton() {
    if (editButtonText === "Cancel") {
      setTimeout(() => {
        setCollaborators(allCollaborators);
      }, 500);
    }
    setExtendedCard(!extendedCard);
    setEditButtonText(extendedCard ? "Edit" : "Cancel");
  }

  async function handleDownloadButton() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/projects/${project.staffProject.project_id}/download`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error("Can't get file URL.");
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }

  async function modifyCollaborators(deleteCollaborator) {
    setCollaborators((prevCollaborators) =>
      prevCollaborators.filter(
        (collaborator) => collaborator !== deleteCollaborator
      )
    );
  }

  async function deleteCollaborators(collaborator) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/staff/username/${collaborator}`
      );

      if (response.ok) {
        const staffData = await response.json();
        const staffId = staffData.staff_id;
        const staffProjectResponse = await fetch(
          `http://localhost:4000/api/staffProject/${staffId}/${project.staffProject.project_id}`,
          {
            method: "DELETE",
          }
        );
        if (staffProjectResponse.ok) {
          console.log("Collaborator deleted successfully.");
        } else {
          console.error("Staff project couldn't be deleted.");
        }
      } else {
        console.log("User couldn't be fetched");
      }
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  }

  async function deleteProject() {
    const confirmed = window.confirm(
      "Are you sure you want to delete the project?"
    );
    if (confirmed) {
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
        setShouldReload(true);
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
              setShouldReload(false);
            } else {
              throw new Error("Failed to restore project");
            }
          } catch (error) {
            console.error("Error restoring project:", error);
          }
        }
      }
    }
  }

  async function saveChanges() {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/projects/${project.project.project_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: description,
            }),
          }
        );
        if (response.ok) {
          const deletedCollaborators = new Set();

          allCollaborators.forEach((collaborator) => {
            if (!collaborators.includes(collaborator)) {
              deletedCollaborators.add(collaborator);
            }
          });

          await Promise.all(
            Array.from(deletedCollaborators).map((collaborator) =>
              deleteCollaborators(collaborator)
            )
          );

          setShouldReload(true);
        } else {
          setError("The description is too long.");
        }
      } catch (error) {
        console.error("Error updating the description:", error);
        setError("Error updating the description:", error);
      }
    }
  }

  const projectDate =
    project.project.creation_date.substring(8, 10) +
    "-" +
    project.project.creation_date.substring(5, 7) +
    "-" +
    project.project.creation_date.substring(0, 4);

  const numberOfCollaborators = staffProjectsData
    ? staffProjectsData.length
    : 0;

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  return (
    <div className="main-container-div">
      <div className="container-div">
        <section className="project-card-main-div">
          <div className="title-div">
            <img src="src/assets/project-icon.png" alt="project-img" />
            <h1>{project.project.project_name}</h1>
          </div>
          <div className="info-div">
            <p>Number of collaborators: {numberOfCollaborators}</p>
          </div>
          <div className="info-div">
            <p>Creation date: {projectDate}</p>
          </div>
          <button
            className="edit-button"
            type="button"
            onClick={handleEditButton}
          >
            {editButtonText}
          </button>
          <button
            className="download-button"
            type="button"
            onClick={handleDownloadButton}
          >
            Download File
          </button>
        </section>
        <section
          className={`project-cardEx-main-div ${
            extendedCard ? "extended" : ""
          }`}
        >
          <div
            className={`main-add-collaborator-div ${
              isAddCollaboratorVisible ? "visible" : "hidden"
            }`}
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              <AddCollaborator
                setIsAddCollaboratorVisible={setIsAddCollaboratorVisible}
                collaborators={collaborators}
                project={project}
              />
            )}
          </div>
          <div className="description-div">
            <h3>ReadME</h3>
            <hr />
            <textarea
              name="desctextarea"
              ref={textareaRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              onFocus={adjustTextareaHeight}
            />
          </div>
          <div className="user-list">
            <h3>Collaborators</h3>
            <hr />
            {collaborators.map((collaborator, index) => (
              <div className="user-card" key={index}>
                <div>
                  <img src="src/assets/user-icon.png" alt="colaborators-icon" />
                  <span>{collaborator}</span>
                </div>
                <button
                  type="button"
                  onClick={() => modifyCollaborators(collaborator)}
                >
                  Delete collaborator
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setIsAddCollaboratorVisible(true)}
            >
              Add collaborator
            </button>
          </div>
          {error && (
            <div style={{ textAlign: "center", width: "100%" }}>
              <p
                style={{
                  color: "red",
                  fontFamily: "Anek Gurmukhi, sans-serif",
                  fontSize: "20px",
                }}
              >
                {error}
              </p>
            </div>
          )}
          <div className="buttons-div">
            <button
              type="button"
              onClick={deleteProject}
              className="delete-button"
            >
              Delete project
            </button>
            <button type="button" onClick={saveChanges} className="save-button">
              Save changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
