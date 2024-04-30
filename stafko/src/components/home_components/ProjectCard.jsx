import React, { useState, useEffect, useRef } from "react";
import "./styles/ProjectCard.css";
import ProjectCardMain from "./ProjectCardMain";
import ProjectCardExtended from "./ProjectCardExtended";

export default function ProjectCard({ project }) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [isAddCollaboratorVisible, setIsAddCollaboratorVisible] =
    useState(false);
  const [isEditProjectName, setIsEditProjectName] = useState(false);
  const [isChangeProjectCustomer, setIsChangeProjectCustomer] = useState(false);
  const [isEditCustomer, setIsEditCustomer] = useState(false);
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
    async function fetchData() {
      try {
        const [
          staffProjectsResponse,
          descriptionResponse,
          collaboratorsResponse,
        ] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
              project.staffProject.project_id
            }`
          ),
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/projects/${
              project.staffProject.project_id
            }`
          ),
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
              project.staffProject.project_id
            }/users`
          ),
        ]);

        if (
          staffProjectsResponse.ok &&
          descriptionResponse.ok &&
          collaboratorsResponse.ok
        ) {
          const [staffData, descriptionData, collaboratorsData] =
            await Promise.all([
              staffProjectsResponse.json(),
              descriptionResponse.json(),
              collaboratorsResponse.json(),
            ]);

          setStaffProjectsData(staffData);
          setInitialDesc(descriptionData.description);
          setCollaborators(collaboratorsData);
          setAllCollaborators(collaboratorsData);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error has occurred:", error);
      }
    }

    fetchData();
  }, [project.staffProject.project_id]);

  useEffect(() => {
    async function fetchOwnerAndCustomer() {
      try {
        const [ownerResponse, customerResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/staff/${projectOwner}`),
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/customers/${projectCustomer}`
          ),
        ]);

        if (ownerResponse.ok) {
          const ownerData = await ownerResponse.json();
          setProjectOwner(ownerData.username);
        }

        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          setProjectCustomer(customerData.customer_name);
        }
      } catch (error) {
        console.error("Failed to fetch project owner or customer: ", error);
      }
    }

    fetchOwnerAndCustomer();
  }, [projectOwner, projectCustomer]);

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
        setDescription(initialDesc);
      }, 500);
    }
    setExtendedCard(!extendedCard);
    setEditButtonText(extendedCard ? "Edit" : "Cancel");
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
        `${import.meta.env.VITE_BACKEND_URL}/staff/username/${collaborator}`
      );

      if (response.ok) {
        const staffData = await response.json();
        const staffId = staffData.staff_id;
        const staffProjectResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staffProject/${staffId}/${
            project.staffProject.project_id
          }`,
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
        const [staffProjectResponse, projectResponse] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/staffProject/project/${
              project.staffProject.project_id
            }`,
            {
              method: "DELETE",
            }
          ),
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/projects/${
              project.project.project_id
            }`,
            {
              method: "DELETE",
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
              `${import.meta.env.VITE_BACKEND_URL}/projects`,
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
          `${import.meta.env.VITE_BACKEND_URL}/projects/${
            project.project.project_id
          }`,
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
        <ProjectCardMain
          project={project}
          extendedCard={extendedCard}
          projectOwner={projectOwner}
          projectCustomer={projectCustomer}
          numberOfCollaborators={numberOfCollaborators}
          projectDate={projectDate}
          setIsEditCustomer={setIsEditCustomer}
          handleEditButton={handleEditButton}
          handleDownloadButton={handleDownloadButton}
        />
        <ProjectCardExtended
          extendedCard={extendedCard}
          setDescription={setDescription}
          isAddCollaboratorVisible={isAddCollaboratorVisible}
          isEditProjectName={isEditProjectName}
          setIsEditProjectName={setIsEditProjectName}
          setIsChangeProjectCustomer={setIsChangeProjectCustomer}
          setIsEditCustomer={setIsEditCustomer}
          isChangeProjectCustomer={isChangeProjectCustomer}
          isEditCustomer={isEditCustomer}
          error={error}
          loading={loading}
          textareaRef={textareaRef}
          description={description}
          setIsAddCollaboratorVisible={setIsAddCollaboratorVisible}
          adjustTextareaHeight={adjustTextareaHeight}
          project={project}
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
