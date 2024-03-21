import React from "react";
import Navbar from "./components/Navbar";
import "./components/styles/Home.css";
import Add from "./components/Add";
import "./components/styles/Add.css"
import { useState } from "react";

export default function Home({ username }) {

  const [isAddProjectVisible, toggleIsAddProjectVisible] = useState(false);

  const toggleAddProject = () => {
    toggleIsAddProjectVisible(!isAddProjectVisible); 
  };

  return (
    <main>
      <div className="bg-div-home">
        <Navbar username={username} toggleAddProject={toggleAddProject} />
        {isAddProjectVisible && <Add/>}
      </div>
    </main>
  );
}
