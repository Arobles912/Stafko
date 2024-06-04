import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar_components/Navbar";
import Add from "../components/floating_components/Add";
import ProjectCard from "../components/home_components/ProjectCard";
import ProjectCardView from "../components/home_components/ProjectCardView";
import "./styles/Home.css";
import MobileNavbar from "../components/navbar_components/MobileNavbar";
import AddCustomer from "../components/floating_components/AddCustomer";
import { fetchProjects } from "../utils/api_calls/ApiCalls";
import { updateTokens } from "../utils/token_utils/TokenUtils";

export default function Home({ setIsLoggedIn }) {
  const [isAddProjectVisible, setIsAddProjectVisible] = useState(false);
  const [isAddCustomerVisible, setIsAddCustomerVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [projectOwner, setProjectOwner] = useState(localStorage.getItem("username"));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMobileNavbarVisible, setIsMobileNavbarVisible] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (username && accessToken) {
      fetchProjects({ username, setProjects });
    }
  }, [username, accessToken]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const lastRefreshTime = parseInt(localStorage.getItem('lastRefreshTime'), 10);
      const currentTime = Date.now();
      const timeSinceLastRefresh = currentTime - lastRefreshTime;
      const timeLeft = 600000 - timeSinceLastRefresh; 

      return timeLeft > 0 ? timeLeft : 0;
    };

    const timeLeftInitial = calculateTimeLeft();
    setTimeLeft(timeLeftInitial);

    const interval = setInterval(async () => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);

      if (timeLeft <= 0) {
        await updateTokens({ refreshToken, setRefreshToken, setAccessToken });
        setTimeLeft(600000);
      }

    }, 1000); 

    return () => clearInterval(interval);
  }, [refreshToken]);

  const toggleAddProject = () => {
    setIsAddProjectVisible(!isAddProjectVisible);
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user, index) => index === 0)
    );
  };

  const toggleAddCustomer = () => {
    setIsAddCustomerVisible(!isAddCustomerVisible);
  };

  const compareProjects = (a, b) => {
    if (a.staffProject.creation_date > b.staffProject.creation_date) {
      return -1;
    }
    if (a.staffProject.creation_date < b.staffProject.creation_date) {
      return 1;
    }
    return 0;
  };

  projects.sort(compareProjects);

  const filteredProjects = projects.filter(
    (project) =>
      project.project &&
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
          setSearchTerm={setSearchTerm}
          isMobileNavbarVisible={isMobileNavbarVisible}
          setIsMobileNavbarVisible={setIsMobileNavbarVisible}
          setAccessToken={setAccessToken}
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
            setProjectOwner={setProjectOwner}
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
