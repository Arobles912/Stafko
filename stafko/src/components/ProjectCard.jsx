import "./styles/ProjectCard.css";
import { useState } from "react";

export default function ProjectCard({key, project}) {
  const [extendedCard, setExtendedCard] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");

  function handleEditButton() {
    setExtendedCard(!extendedCard);
    setEditButtonText(extendedCard ? "Edit" : "Cancel");
  }

  return (
    <div className="main-container-div">
      <div className="container-div">
        <section className="project-card-main-div">
          <img src="src/assets/project-icon.png" alt="project-img"></img>
          <h1>Nombre proyecto</h1>
          <div className="info-div">
            <p>Numero de miembros: 2</p>
          </div>
          <div className="info-div">
            <p>Fecha de creacion: 12/12/2012</p>
          </div>
          <button className="edit-button" onClick={handleEditButton}>
            {editButtonText}
          </button>
          <button className="download-button">Download File</button>
        </section>
        <section
          className={`project-cardEx-main-div ${
            extendedCard ? "extended" : ""
          }`}
        >
          <div className="description-div">
            <p>
              Descripción:{" "}
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                voluptas praesentium rem vitae nam. Veniam ipsam in asperiores,
                quibusdam eius quasi ex veritatis voluptas minus sit rerum,
                aperiam, ducimus maiores?Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Repellendus ratione commodi similique eaque ut
                cum, perspiciatis minus debitis voluptatibus repudiandae
                assumenda ex atque recusandae explicabo fugit nostrum deserunt
                nobis sint! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Dignissimos voluptates maiores ea quas est nemo amet
                debitis deleniti temporibus, fugit doloremque? Eligendi, nobis.
                Voluptatibus, non. Libero quo perferendis in magni? Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Tempora dolorem
                porro nam similique officia optio iusto ipsa adipisci impedit
                excepturi architecto, laudantium ullam fugiat reiciendis
                repudiandae aliquam sint labore quam. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Assumenda, fugiat nam totam iste,
                non a repudiandae molestiae sequi reiciendis sit incidunt.
                Consequatur fugit expedita enim cupiditate illo impedit magnam
                porro? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Placeat, aliquid. Incidunt magnam animi eaque laudantium iusto
                veniam eum debitis hic dignissimos non itaque, repudiandae
                molestiae ratione cumque nulla dolore omnis. Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Ratione consequuntur
                quia voluptates molestias veritatis debitis illum et ipsam,
                animi, hic ipsum sequi perferendis, omnis rem cupiditate.
                Quisquam tempore ab vel. Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Adipisci, voluptate molestiae. Commodi,
                asperiores a recusandae dolor distinctio repellendus, cum beatae
                ut, corporis est vero pariatur repudiandae voluptatem laboriosam
                placeat consequatur? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Vel iure quos, molestiae nesciunt omnis
                blanditiis quia, esse quis corrupti accusantium quas, veniam rem
                repudiandae laudantium fuga impedit voluptate tenetur? Incidunt!
                Lorem ipsum dolor sit amet consectetur adipisicing elit.

              </span>
            </p>
          </div>
          <div className="user-list">
            <h3>Colaborators</h3>
            <hr />
            <div className="user-card">
              <img src="src/assets/user-icon.png" alt="colaborators-icon" />
              <span>Nombre usuario</span>
            </div>
            <div className="user-card">
              <img src="src/assets/user-icon.png" alt="colaborators-icon" />
              <span>Nombre usuario</span>
            </div>
            <div className="user-card">
              <img src="src/assets/user-icon.png" alt="colaborators-icon" />
              <span>Nombre usuario</span>
            </div>
          </div>
          <button className="delete-button">Delete project</button>
        </section>
      </div>
    </div>
  );
}
