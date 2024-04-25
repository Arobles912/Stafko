import React, { useState, useEffect } from "react";
import Navbar from "../navbar_components/Navbar";
import Add from "../floating_components/Add";
import ProjectCard from "./ProjectCard";
import ProjectCardView from "./ProjectCardView";
import "./styles/Home.css";
import MobileNavbar from "../navbar_components/MobileNavbar";

export default function Home({ setIsLoggedIn }) {
  const [isAddProjectVisible, setIsAddProjectVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState("");
  const [projectOwner, setProjectOwner] = useState(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMobileNavbarVisible, setIsMobileNavbarVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const storedToken = localStorage.getItem("token");
        setUsername(storedUsername);
        setToken(storedToken);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staff/username/${projectOwner}`
        );
        if (response.ok) {
          const data = await response.json();
          setProjectOwner(data.staff_id);
        }
      } catch (error) {
        console.error("Failed to fetch project owner: ", error);
      }
    }

    fetchOwner();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/staff/username/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          const staffId = userData.staff_id;
          const staffProjectsResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/staffProject/staff/${staffId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (staffProjectsResponse.ok) {
            const staffProjectsData = await staffProjectsResponse.json();
            const projectsData = await Promise.all(
              staffProjectsData.map(async (staffProject) => {
                const projectResponse = await fetch(
                  `${import.meta.env.VITE_BACKEND_URL}/projects/${
                    staffProject.project_id
                  }`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (projectResponse.ok) {
                  const projectData = await projectResponse.json();
                  return {
                    project: projectData,
                    staffProject: staffProject,
                  };
                } else {
                  console.log(
                    `Project not found with the id: ${staffProject.project_id}`
                  );
                  return null;
                }
              })
            );
            setProjects(projectsData.filter((project) => project !== null));
          } else {
            console.log("Could not find any projects.");
          }
        } else {
          console.log("An error has occurred");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (username && token) {
      fetchProjects();
    }
  }, [username, token]);

  const toggleAddProject = () => {
    setIsAddProjectVisible(!isAddProjectVisible);
    selectedUsers.splice(1, 1);
  };

  const compareProjects = (a, b) => {
    if (a.project.creation_date > b.project.creation_date) {
      return -1;
    }
    if (a.project.creation_date < b.project.creation_date) {
      return 1;
    }
    return 0;
  };

  projects.sort(compareProjects);

  const filteredProjects = projects.filter((project) =>
    project.project.project_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <div className="bg-div-home">
        <MobileNavbar
          setSearchTerm={setSearchTerm}
          isMobileNavbarVisible={isMobileNavbarVisible}
          setIsMobileNavbarVisible={setIsMobileNavbarVisible}
        />
        <Navbar
          username={username}
          toggleAddProject={toggleAddProject}
          setIsLoggedIn={setIsLoggedIn}
          addButtonText={
            isAddProjectVisible ? "Cancel add project" : "Add project"
          }
          addCustomerText={
            isAddProjectVisible ? "Cancel add customer" : "Add customer"
          }
          setUsername={setUsername}
          setToken={setToken}
          setSearchTerm={setSearchTerm}
          isMobileNavbarVisible={isMobileNavbarVisible}
          setIsMobileNavbarVisible={setIsMobileNavbarVisible}
        />
        <div
          className={`main-add-div ${
            isAddProjectVisible ? "visible" : "hidden"
          }`}
        >
          <Add
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
        {filteredProjects.map((project) =>
          projectOwner === project.project.project_owner ? (
            <ProjectCard
              key={project.staffProject.project_id}
              project={project}
              data-testid={`project-card-${project.staffProject.project_id}`}
            />
          ) : (
            <ProjectCardView
              key={project.staffProject.project_id}
              project={project}
              data-testid={`project-card-${project.staffProject.project_id}`}
            />
          )
        )}
      </div>
    </main>
  );
}
