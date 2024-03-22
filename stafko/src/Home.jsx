import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./components/styles/Home.css";
import Add from "./components/Add";
import "./components/styles/Add.css";
import ProjectCard from "./components/ProjectCard";

export default function Home({ username, setIsLoggedIn }) {
  const [isAddProjectVisible, toggleIsAddProjectVisible] = useState(false);
  const [addButtonText, setAddButtonText] = useState("Add project");

  const handleUserInfo = async () => { 
    try {
      const response = await fetch(`http://localhost:4000/api/staff/username/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Si");
      } else {
        console.log("No");
      }
    } catch (error) {
      console.error(error)
    }
  };
  
  useEffect(() => {
    handleUserInfo();
  }, []);

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
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </main>
  );
}
