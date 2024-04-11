import "cypress-file-upload";

describe("Add projects", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/api/auth/login").as(
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

  it("Should add a project", () => {
    cy.visit("http://localhost:5173/home");

    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type("Project name");
    cy.get('textarea[name="projectdesc"]').type("Project description");
    cy.get("#users").select("Hola");
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
    cy.wait(800);
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".delete-button").click();
        cy.on("window:confirm", () => true);
      });
  });

  it("Should add a project with no description", () => {
    cy.visit("http://localhost:5173/home");

    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type("Project name");
    cy.get("#users").select("Hola");
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
    cy.wait(800);

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".delete-button").click();
        cy.on("window:confirm", () => true);
      });
  });

  it("Should add a project with multiple collaborators", () => {
    cy.visit("http://localhost:5173/home");

    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type("Project name");
    cy.get('textarea[name="projectdesc"]').type("Project description");
    cy.get("#users").select("Hola");
    cy.get(".add-user-button").eq(0).click();
    cy.get("#users").select("Mango");
    cy.get(".add-user-button").eq(0).click();
    cy.get("#users").select("buenas");
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
    cy.wait(800);
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".delete-button").click();
        cy.on("window:confirm", () => true);
      });
  });

  it("Should display an error message when trying to add a project without a name", () => {
    cy.visit("http://localhost:5173/home");

    cy.get('button[name="addproject"]').click();
    cy.get('textarea[name="projectdesc"]').type("Project description");
    cy.get("#users").select("Hola");
    cy.get(".add-user-button").eq(0).click();
    cy.readFile("src/assets/staff-icon.png", "base64").then((fileContent) => {
      cy.get("#projectfile").attachFile({
        fileContent,
        fileName: "staff-icon.png",
        mimeType: "image/png",
      });
    });
    cy.get(".add-project-input").click();
    cy.get(".error-message").should("exist");
  });

  it("Should display an error message when trying to add a project without collaborators", () => {
    cy.visit("http://localhost:5173/home");
    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type("Project name");
    cy.get('textarea[name="projectdesc"]').type("Project description");
    cy.readFile("src/assets/staff-icon.png", "base64").then((fileContent) => {
      cy.get("#projectfile").attachFile({
        fileContent,
        fileName: "staff-icon.png",
        mimeType: "image/png",
      });
    });
    cy.get(".add-project-input").click();
    cy.get(".error-message").should("exist");
  });

  it("Should display an error message when trying to add a project without a project file", () => {
    cy.visit("http://localhost:5173/home");
    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type("Project name");
    cy.get('textarea[name="projectdesc"]').type("Project description");
    cy.get("#users").select("Hola");
    cy.get(".add-user-button").eq(0).click();
    cy.get(".add-project-input").click();
    cy.get(".error-message").should("exist");
  });

  it("Should not allow more than 50 characters in the projectname field", () => {
    cy.visit("http://localhost:5173/home");
    cy.get('button[name="addproject"]').click();
    const longProjectName = "a".repeat(51);
    cy.get('input[name="projectname"]').type(longProjectName);

    cy.get('input[name="projectname"]').should(
      "have.value",
      longProjectName.substring(0, 50)
    );
  });

  it("Should not change the number of users in the list when adding an existing user", () => {
    cy.visit("http://localhost:5173/home");
  
    cy.get('button[name="addproject"]').click();
    cy.get("#users").select("Hola");
    cy.get(".add-user-button").eq(0).click();
  
    cy.get(".users-added-div").its("length").as("initialUserCount");
  
    cy.get("#users").select("Hola");
    cy.get(".add-user-button").eq(0).click();
  
    cy.get("@initialUserCount").then((initialUserCount) => {
      cy.get(".users-added-div").should("have.length", initialUserCount);
    });
  });

  it("Should not allow more than 3000 characters in the projectdesc field", () => {
    cy.visit("http://localhost:5173/home");
    cy.get('button[name="addproject"]').click();
    const longProjectDesc = "a".repeat(3001);
    cy.get('textarea[name="projectdesc"]').type(longProjectDesc);

    cy.get('textarea[name="projectdesc"]').should(
      "have.value",
      longProjectDesc.substring(0, 3000)
    );
  });
  
});
