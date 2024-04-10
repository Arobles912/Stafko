import "cypress-file-upload";

describe("Edit projects", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:4000/api/auth/login").as(
      "loginRequest"
    );

    cy.visit("http://localhost:5173");
    cy.get('input[name="username"]').type("Hola");
    cy.get('input[name="password"]').type("12345");
    cy.get('input[type="submit"]').click();

    cy.wait("@loginRequest").then((interception) => {
      const token = interception.response.body.token;

      window.localStorage.setItem("token", token);
    });
  });

  before(() => {
    cy.visit("http://localhost:5173/home");

    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type("Project name");
    cy.get('textarea[name="projectdesc"]').type("Project description");
    cy.get("#users").select("Hola");
    cy.get(".add-user-button").eq(0).click();
    cy.get("#users").select("Mango");
    cy.get(".add-user-button").eq(0).click();
    cy.readFile("src/assets/staff-icon.png", "base64").then((fileContent) => {
      cy.get("#projectfile").attachFile({
        fileContent,
        fileName: "staff-icon.png",
        mimeType: "image/png",
      });
    });
    cy.get(".add-project-input").click();
    cy.get(".success-message").should("exist");
  });

  it("Should edit the description", () => {
    cy.visit("http://localhost:5173/home");
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get('textarea[name="desctextarea"]').type(" I edited this");

        cy.get(".save-button").click();
      });

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get('textarea[name="desctextarea"]').should(
          "have.value",
          "Project description I edited this"
        );
      });
  });

  it("Should delete one collaborator", () => {
    cy.visit("http://localhost:5173/home");        
  
    let initialCollaboratorsCount;
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .its("length")
          .then((length) => {
            initialCollaboratorsCount = length;
          });
      });
  
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".user-card button").eq(1).click();
        cy.get(".save-button").click();
      });
  
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .its("length")
          .should("be.lessThan", initialCollaboratorsCount + 1); 
      });
  });

  after(() => {
    cy.wait(1000);
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".delete-button").click();
        cy.on("window:confirm", () => true);
      });
  });
});
