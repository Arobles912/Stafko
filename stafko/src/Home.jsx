import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import ProjectCard from "./components/ProjectCard";
import "./components/styles/Home.css";

export default function Home({ username, setIsLoggedIn }) {
  const [isAddProjectVisible, setIsAddProjectVisible] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/staff/username/${username}`
        );
        if (response.ok) {
          const userData = await response.json();
          const staffId = userData.staff_id;
          const staffProjectsResponse = await fetch(
            `http://localhost:4000/api/staffProject/staff/${staffId}`
          );
          if (staffProjectsResponse.ok) {
            const staffProjectsData = await staffProjectsResponse.json();
            const projectsData = await Promise.all(
              staffProjectsData.map(async (staffProject) => {
                const projectResponse = await fetch(
                  `http://localhost:4000/api/projects/${staffProject.project_id}`
                );
                if (projectResponse.ok) {
                  const projectData = await projectResponse.json();
                  return {
                    project: projectData,
                    staffProject: staffProject
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
    fetchProjects();
  }, [username]);

  const toggleAddProject = () => {
    setIsAddProjectVisible(!isAddProjectVisible);
  };

  return (
    <main>
      <div className="bg-div-home">
        <Navbar
          username={username}
          toggleAddProject={toggleAddProject}
          setIsLoggedIn={setIsLoggedIn}
          addButtonText={
            isAddProjectVisible ? "Cancel add project" : "Add project"
          }
        />
        {isAddProjectVisible && <Add />}
        {projects.map((project) => (
          <ProjectCard key={project.staffProject.project_id} project={project} />
        ))}
      </div>
    </main>
  );
}
