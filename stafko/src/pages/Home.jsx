import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar_components/Navbar";
import Add from "../components/floating_components/Add";
import ProjectCard from "../components/home_components/ProjectCard";
import ProjectCardView from "../components/home_components/ProjectCardView";
import "./styles/Home.css";
import MobileNavbar from "../components/navbar_components/MobileNavbar";
import AddCustomer from "../components/floating_components/AddCustomer";
import { fetchProjects, fetchOwner } from "../utils/api_calls/ApiCalls";

export default function Home({ setIsLoggedIn }) {
  const [isAddProjectVisible, setIsAddProjectVisible] = useState(false);
  const [isAddCustomerVisible, setIsAddCustomerVisible] = useState(false);
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
    if (projectOwner && token) {
      fetchOwner({ projectOwner, token, setProjectOwner });
    }
  }, );

  useEffect(() => {
    if (username && token) {
      fetchProjects({ username, token, setProjects });
    }
  }, [username, token]);

  const toggleAddProject = () => {
    setIsAddProjectVisible(!isAddProjectVisible);
    selectedUsers.splice(1, 1);
  };

  const toggleAddCustomer = () => {
    setIsAddCustomerVisible(!isAddCustomerVisible);
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
          toggleAddCustomer={toggleAddCustomer}
          setIsLoggedIn={setIsLoggedIn}
          addButtonText={
            isAddProjectVisible ? "Cancel add project" : "Add project"
          }
          addCustomerText={
            isAddCustomerVisible ? "Cancel add customer" : "Add customer"
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
            projectOwner={projectOwner}
          />
        </div>
        <div
          className={`main-add-customer-div ${
            isAddCustomerVisible ? "visible" : "hidden"
          }`}
        >
          <AddCustomer />
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
