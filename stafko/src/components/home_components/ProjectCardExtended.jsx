import React, { useState, useEffect} from "react";
import "./styles/ProjectCard.css";
import AddCollaborator from "../floating_components/AddCollaborator";
import EditProjectName from "../floating_components/EditProjectName";
import ChangeProjectCustomer from "../floating_components/ChangeProjectCustomer";
import CustomerCard from "../floating_components/CustomerCard";
import { startTimer, stopTimer } from "../clockify/ClockifyFunctions";

export default function ProjectCardExtended({
  extendedCard,
  isAddCollaboratorVisible,
  isEditProjectName,
  isChangeProjectCustomer,
  setIsChangeProjectCustomer,
  isEditCustomer,
  error,
  loading,
  setIsEditProjectName,
  textareaRef,
  description,
  setDescription,
  setIsEditCustomer,
  adjustTextareaHeight,
  setIsAddCollaboratorVisible,
  project,
  collaborators,
  projectOwner,
  modifyCollaborators,
  deleteProject,
  saveChanges
}) {

  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (timer !== null) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
            onClick={() => startTimer(project, setTimer, setTime)}
          >
            Start counting
          </button>
        ) : (
          <button
            type="button"
            name="stoptimebutton"
            className="count-time-button"
            onClick={() => stopTimer(time, setTimer, setTime)}
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
            onClick={deleteProject}
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
