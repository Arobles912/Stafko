import React, { useState, useEffect, useRef } from "react";
import "./styles/ProjectCard.css";

export default function ProjectCardView({ project }) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [viewButtonText, setViewButtonText] = useState("View");
  const [description, setDescription] = useState(project.project.description);
  const [projectOwner, setProjectOwner] = useState(
    project.project.project_owner
  );
  const [projectCustomer, setProjectCustomer] = useState(
    project.project.associated_customer
  );
  const [staffProjectsData, setStaffProjectsData] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);

  const textareaRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const staffProjectsResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
            project.staffProject.project_id
          }`
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
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
            project.staffProject.project_id
          }/users`
        );
        if (response.ok) {
          const data = await response.json();
          setCollaborators(data);
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
    async function fetchOwnerName() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staff/${projectOwner}`
        );
        if (response.ok) {
          const data = await response.json();
          setProjectOwner(data.username);
        }
      } catch (error) {
        console.error("Failed to fetch project owner: ", error);
      }
    }
    fetchOwnerName();
  }, []);

  useEffect(() => {
    async function fetchCustomerName() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/customers/${projectCustomer}`
        );
        if (response.ok) {
          const data = await response.json();
          setProjectCustomer(data.customer_name);
        }
      } catch (error) {
        console.error("Failed to fetch project customer: ", error);
      }
    }

    fetchCustomerName();
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  function handleViewButton() {
    setExtendedCard(!extendedCard);
    setViewButtonText(extendedCard ? "View" : "Close");
  }

  async function handleDownloadButton() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/projects/${
          project.staffProject.project_id
        }/download`
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
        setError("Can't get file URL.");
        throw new Error("Can't get file URL.");
      }
    } catch (error) {
      setError("Error downloading the file:", error);
      console.error("Error downloading the file:", error);
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

  return (
    <div className="main-container-div">
      <div className="container-div">
        <section className="project-card-main-div">
          <div className="title-div">
            <img
              src="src/assets/project_images/project-icon.png"
              alt="project-img"
            />
            <h1>{project.project.project_name}</h1>
          </div>
          <div className="info-div-container">
            <div className="info-div">
              <p>
                Owner: <span>{projectOwner}</span>
              </p>
            </div>
            <div className="info-div">
              <p>
                Customer: <span className="project-owner-span">{projectCustomer}</span>
              </p>
            </div>
            <div className="info-div">
              <p>Number of collaborators: {numberOfCollaborators}</p>
            </div>
            <div className="info-div">
              <p>Creation date: {projectDate}</p>
            </div>
          </div>
          <button
            className="view-button"
            type="button"
            onClick={handleViewButton}
          >
            {viewButtonText}
          </button>
          <button
            className="download-button"
            type="button"
            onClick={handleDownloadButton}
          >
            Download File
          </button>
          <hr className="mobile-hr" />
        </section>
        <section
          className={`project-cardEx-main-div ${
            extendedCard ? "extended" : ""
          }`}
        >
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
              readOnly
            />
          </div>
          <div className="user-list">
            <h3>Collaborators</h3>
            <hr />
            {collaborators.map((collaborator, index) => (
              <div className="user-card" key={index}>
                <div>
                  <img
                    src="src/assets/user_images/user-icon.png"
                    alt="colaborators-icon"
                  />
                  <span
                    className={
                      collaborator === projectOwner ? "owner-color-span" : ""
                    }
                  >
                    {collaborator}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
