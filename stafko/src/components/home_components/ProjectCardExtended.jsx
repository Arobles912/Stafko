import React, { useState, useEffect } from "react";
import "./styles/ProjectCard.css";
import AddCollaborator from "../floating_components/AddCollaborator";
import EditProjectName from "../floating_components/EditProjectName";
import ChangeProjectCustomer from "../floating_components/ChangeProjectCustomer";
import CustomerCard from "../floating_components/CustomerCard";
import {
  startTimer,
  stopTimer,
  getActiveTimer,
  updateTotalTime
} from "../../utils/clockify_calls/ClockifyFunctions";
import UserInfo from "../floating_components/UserInfo";

export default function ProjectCardExtended({
  project,
  extendedCard,
  isEditCustomer,
  error,
  loading,
  textareaRef,
  description,
  isUserInfo,
  setIsUserInfo,
  setDescription,
  setIsEditCustomer,
  collaborators,
  allCollaborators,
  projectOwner,
  modifyCollaborators,
  deleteProject,
  saveChanges,
}) {
  const [isChangeProjectCustomer, setIsChangeProjectCustomer] = useState(false);
  const [isEditProjectName, setIsEditProjectName] = useState(false);
  const [isAddCollaboratorVisible, setIsAddCollaboratorVisible] =
    useState(false);
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState(null);
  const [collaboratorName, setCollaboratorName] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const timerState = localStorage.getItem("timerstate");
    if (timerState === "active") {
      getActiveTimer().then((elapsedTimeInSeconds) => {
        if (elapsedTimeInSeconds > 0) {
          setTimer(1);
          setTime(elapsedTimeInSeconds);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (timer !== null) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleStartTimer = () => {
    const activeTimer = localStorage.getItem("timerstate");
    if (activeTimer !== "active") {
      startTimer(project, setTimer, setTime, username);
      localStorage.setItem("timerstate", "active");
    } else {
      console.log("A timer is already running.");
    }
  };
  
  const handleStopTimer = async () => {
    stopTimer(timer, setTimer, setTime);
    localStorage.removeItem("timerstate");
    const timeInMilliseconds = time * 1000;
    setMilliseconds(timeInMilliseconds);
    await updateTotalTime({ milliseconds: timeInMilliseconds, username, project });
  };
  
  return (
    <section
      className={`project-cardEx-main-div ${extendedCard ? "extended" : ""}`}
    >
      <div
        className={`main-add-collaborator-div ${
          isAddCollaboratorVisible ? "visible" : "hidden"
        }`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AddCollaborator
            setIsAddCollaboratorVisible={setIsAddCollaboratorVisible}
            collaborators={collaborators}
            allCollaborators={allCollaborators}
            project={project}
          />
        )}
      </div>
      <div
        className={`main-edit-project-name-div ${
          isEditProjectName ? "visible" : "hidden"
        }`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <EditProjectName
            setIsEditProjectName={setIsEditProjectName}
            project={project}
          />
        )}
      </div>

      <div
        className={`main-edit-project-name-div ${
          isChangeProjectCustomer ? "visible" : "hidden"
        }`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ChangeProjectCustomer
            setIsChangeProjectCustomer={setIsChangeProjectCustomer}
            project={project}
          />
        )}
      </div>

      <div
        className={`main-edit-customer-div ${
          isEditCustomer ? "visible" : "hidden"
        }`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <CustomerCard
            setIsEditCustomer={setIsEditCustomer}
            project={project}
          />
        )}
      </div>

      <div
        className={`main-user-info-div ${
          isUserInfo ? "visible" : "hidden"
        }`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <UserInfo
            setIsUserInfo={setIsUserInfo}
            isUserInfo={isUserInfo}
            project={project}
            username={collaboratorName}
          />
        )}
      </div>
      <div className="description-div">
        <h3>ReadME</h3>
        <hr />
        <textarea
          name="desctextarea"
          ref={textareaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          onFocus={adjustTextareaHeight}
        />
      </div>
      <div className="user-list">
  <h3>Collaborators</h3>
  <hr />
  {collaborators.map((collaborator, index) => (
    <div className="user-card" key={index}>
      <div>
        <img
          src="src/assets/user_images/user-icon.png"
          alt="colaborators-icon"
        />
        <span 
          className={
            collaborator === projectOwner ? "owner-color-span" : ""
          }
          onClick={() => {
            setIsUserInfo(true);
            setCollaboratorName(collaborator);
          }}
        >
          {collaborator}
        </span>
      </div>
      {collaborator !== projectOwner && (
        <button
          type="button"
          onClick={() => modifyCollaborators(collaborator)}
        >
          Delete collaborator
        </button>
      )}
    </div>
  ))}
  <button type="button" onClick={() => setIsAddCollaboratorVisible(true)}>
    Add collaborator
  </button>
</div>

      {error && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <p
            className="error-message"
            style={{
              color: "red",
              fontFamily: "Anek Gurmukhi, sans-serif",
              fontSize: "20px",
            }}
          >
            {error}
          </p>
        </div>
      )}
      <div className="buttons-div">
        <button
          type="button"
          name="editprojectnamebutton"
          className="edit-project-button"
          onClick={() => setIsEditProjectName(true)}
        >
          Edit project name
        </button>
        <button
          type="button"
          name="changeprojectcustomerbutton"
          className="edit-project-button"
          onClick={() => setIsChangeProjectCustomer(true)}
        >
          Edit project customer
        </button>
        {timer === null ? (
          <button
            type="button"
            name="counttimebutton"
            className="count-time-button"
            onClick={handleStartTimer}
          >
            Start counting
          </button>
        ) : (
          <button
            type="button"
            name="stoptimebutton"
            className="count-time-button"
            onClick={handleStopTimer}
          >
            Stop counting
          </button>
        )}
      </div>
      <div className="action-buttons-div">
        <div className="empty-div"></div>
        <div className="action-buttons">
          <button
            type="button"
            onClick={() => deleteProject(project.staffProject.project_id)}
            className="delete-button"
          >
            Delete project
          </button>
          <button type="button" onClick={saveChanges} className="save-button">
            Save changes
          </button>
        </div>
        <div className="time-counter-container">
          <p className="time-counter">
            Time working:{" "}
            <span>
              {Math.floor(time / 3600)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor((time % 3600) / 60)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor(time % 60)
                .toString()
                .padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
