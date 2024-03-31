import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./components/styles/Home.css";
import Add from "./components/Add";
import "./components/styles/Add.css";
import ProjectCard from "./components/ProjectCard";

export default function Home({ username, setIsLoggedIn }) {
  const [isAddProjectVisible, toggleIsAddProjectVisible] = useState(false);
  const [addButtonText, setAddButtonText] = useState("Add project");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/staff/username/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const projectId = userData.project_id;
          console.log("Project ID:", projectId);
          const projectsResponse = await fetch(`http://localhost:4000/api/projects/${projectId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (projectsResponse.ok) {
            const projectsData = await projectsResponse.json();
            setProjects(projectsData);
          } else {
            console.log("No projects found");
          }
        } else {
          console.log("An error has ocurred");
        }
      } catch (error) {
        console.error(error)
      }
    };
    fetchProjects();
  }, [username]);

  const toggleAddProject = () => {
    toggleIsAddProjectVisible(!isAddProjectVisible);
    setAddButtonText(isAddProjectVisible ? "Add project" : "Cancel add project");
  };

  return (
    <main>
      <div className="bg-div-home">
        <Navbar
          username={username}
          toggleAddProject={toggleAddProject}
          setIsLoggedIn={setIsLoggedIn}
          addButtonText={addButtonText}
        />
        {isAddProjectVisible && <Add />}
        {projects.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>
    </main>
  );
}
