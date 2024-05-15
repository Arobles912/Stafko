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
  }, []);

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
        `${
          import.meta.env.VITE_BACKEND_DIRECTUS
        }/items/staff?filter=username,eq,${collaborator}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const staffData = await response.json();
        const staffId = staffData[0].staff_id;
        const staffProjectResponse = await fetch(
          `${
            import.meta.env.VITE_BACKEND_DIRECTUS
          }/items/staffProject?filter=staff_id,eq,${staffId}&filter=project_id,eq,${
            project.staffProject.project_id
          }`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
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
        const [staffProjectResponse, projectResponse] = await Promise.all([
          fetch(
            `${
              import.meta.env.VITE_BACKEND_DIRECTUS
            }/items/staffProject?filter=project_id,eq,${
              project.staffProject.project_id
            }`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          ),
          fetch(
            `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects/${
              project.project.project_id
            }`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          ),
        ]);

        if (!staffProjectResponse.ok) {
          throw new Error("Failed to delete staff project");
        }

        staffProjectData = { ...project };

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
              `${import.meta.env.VITE_BACKEND_DIRECTUS}/items/projects`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
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
