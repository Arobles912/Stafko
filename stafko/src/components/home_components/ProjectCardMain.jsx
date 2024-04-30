import "./styles/ProjectCard.css";

export default function ProjectCardMain({
  extendedCard,
  project,
  projectOwner,
  projectCustomer,
  numberOfCollaborators,
  projectDate,
  setIsEditCustomer,
  handleEditButton,
  handleDownloadButton,
}) {
  return (
    <section className="project-card-main-div">
      <div className="title-div">
        <img
          src="src/assets/project_images/project-icon.png"
          alt="project-img"
        />
        <h1 name="projecttitle">{project.project.project_name}</h1>
      </div>
      <div className="info-div-container">
        <div className="info-div">
          <p>
            Owner: <span className="project-owner-span">{projectOwner}</span>
          </p>
        </div>
        <div className="info-div">
          <p>
            Customer:{" "}
            <span
              className="project-customer-span"
              onClick={() => setIsEditCustomer(true)}
            >
              {projectCustomer}
            </span>
          </p>
        </div>
        <div className="info-div">
          <p>Number of collaborators: {numberOfCollaborators}</p>
        </div>
        <div className="info-div">
          <p>Creation date: {projectDate}</p>
        </div>
      </div>
      <button className="edit-button" type="button" onClick={handleEditButton}>
        {extendedCard ? "Cancel" : "Edit"}
      </button>
      <button
        className="download-button"
        type="button"
        onClick={handleDownloadButton}
      >
        Download File
      </button>
      <hr className="mobile-hr" />
    </section>
  );
}
