import React, { useState, useEffect, useRef } from "react";
import "./styles/ProjectCard.css";
import ProjectCardMain from "./ProjectCardMain";
import ProjectCardExtended from "./ProjectCardExtended";
import {
  fetchOwnerName,
  fetchCustomerName,
  fetchData,
} from "../../utils/api_calls/ApiCalls";

export default function ProjectCard({ project }) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [isEditCustomer, setIsEditCustomer] = useState(false);
  const [isUserInfo, setIsUserInfo] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [description, setDescription] = useState(project.project.description);
  const [projectOwner, setProjectOwner] = useState(
    project.project.project_owner
  );
  const [projectCustomer, setProjectCustomer] = useState(
    project.project.associated_customer
  );
  const [staffProjectsData, setStaffProjectsData] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [allCollaborators, setAllCollaborators] = useState([]);
  const [initialDesc, setInitialDesc] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData({
      project,
      setStaffProjectsData,
      setCollaborators,
      setAllCollaborators,
      setInitialDesc,
      setLoading,
    });
  }, [project.staffProject.project_id]);

  useEffect(() => {
    fetchOwnerName({ projectOwner, setProjectOwner });
    fetchCustomerName({ projectCustomer, setProjectCustomer });
    setInitialDesc(description)
  }, []);

  async function handleDownloadButton() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${
          project.staffProject.project_id
        }/download`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
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
      console.error("Error downloading the file:", error);
    }
  }

  async function deleteCollaborators(collaborator) {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff?filter[username][_eq]=${collaborator}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.ok) {
        const staffData = await response.json();
        const staffId = staffData.data[0].staff_id;
  
        const staffProjectResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project?filter[staff_id][_eq]=${staffId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        if (staffProjectResponse.ok) {
          const staffProjectData = await staffProjectResponse.json();
          const staffProjectId = staffProjectData.data[0].id;
  
          const deleteResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project/${staffProjectId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
  
          if (deleteResponse.ok) {
            console.log("Staff project deleted successfully.");
          } else {
            console.error("Staff project couldn't be deleted.");
          }
        } else {
          console.error("Failed to fetch staff project data.");
        }
      } else {
        console.error("User couldn't be fetched");
      }
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  }
  
  

  async function deleteProject(projectId) {
    const accessToken = localStorage.getItem("accessToken");
  
    const confirmed = window.confirm("Are you sure you want to delete the project");
    
    if (!confirmed) {
      return;
    }
  
    try {
      const staffProjectResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project?filter[project_id][_eq]=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (!staffProjectResponse.ok) {
        throw new Error("Failed to fetch staff projects");
      }
  
      const staffProjectsData = await staffProjectResponse.json();
  
      const deleteStaffProjectsPromises = staffProjectsData.data.map(
        async (staffProject) => {
          const staffProjectId = staffProject.id;
          const staffProjectDeleteResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/staff_project/${staffProjectId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (!staffProjectDeleteResponse.ok) {
            throw new Error("Failed to delete staff project");
          }
        }
      );
  
      await Promise.all(deleteStaffProjectsPromises);
  
      const projectDeleteResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (!projectDeleteResponse.ok) {
        throw new Error("Failed to delete project");
      }
  
      console.log("Project and associated staff projects deleted successfully.");
      setShouldReload(true);
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  }
  


  async function saveChanges() {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${
            project.project.project_id
          }`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
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

  function handleEditButton() {
    if (editButtonText === "Cancel") {
      setTimeout(() => {
        setCollaborators(allCollaborators);
        setDescription(initialDesc);
      }, 500);
    }
    setExtendedCard(!extendedCard);
    setEditButtonText(extendedCard ? "Edit" : "Cancel");
  }

  async function modifyCollaborators(deleteCollaborator) {
    setCollaborators((prevCollaborators) =>
      prevCollaborators.filter(
        (collaborator) => collaborator !== deleteCollaborator
      )
    );
  }

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
        <ProjectCardMain
          project={project}
          extendedCard={extendedCard}
          projectOwner={projectOwner}
          projectCustomer={projectCustomer}
          numberOfCollaborators={numberOfCollaborators}
          setIsEditCustomer={setIsEditCustomer}
          handleEditButton={handleEditButton}
          handleDownloadButton={handleDownloadButton}
        />
        <ProjectCardExtended
          project={project}
          extendedCard={extendedCard}
          setDescription={setDescription}
          setIsEditCustomer={setIsEditCustomer}
          isEditCustomer={isEditCustomer}
          isUserInfo={isUserInfo}
          setIsUserInfo={setIsUserInfo}
          error={error}
          loading={loading}
          textareaRef={textareaRef}
          description={description}
          collaborators={collaborators}
          projectOwner={projectOwner}
          modifyCollaborators={modifyCollaborators}
          deleteProject={deleteProject}
          saveChanges={saveChanges}
        />
      </div>
    </div>
  );
}
