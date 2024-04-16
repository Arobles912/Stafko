import "cypress-file-upload";

describe("Edit projects", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
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

  before(() => {
    cy.viewport(1920, 1080);
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

    cy.wait(1000);

    cy.visit("http://localhost:5173/home");

    cy.get('button[name="logoutbutton"]').click();
  });

  afterEach(() => {

    cy.get('button[name="logoutbutton"]').click();
  });

  it("Should save without changes", () => {
    cy.viewport(1920, 1080);

    let initialCollaboratorsCount;
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".save-button").click();
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .then((length) => {
            initialCollaboratorsCount = length;
          });
      });
      cy.on("window:confirm", () => true);

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();

        cy.get('textarea[name="desctextarea"]').should(
          "have.value",
          "Project description"
        );
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .should("eq", initialCollaboratorsCount);
      });
  });

  it("Should edit the project name", () => {
    cy.viewport(1920, 1080);
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get('button[name="editprojectnamebutton"]').click();
        cy.get('input[name="projectnameinput"]').type(" edited name")

        cy.get(".confirm-button").eq(1).click();
      });
      cy.on("window:confirm", () => true);

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.wait(500);
        cy.get('button[name="editprojectnamebutton"]').click();
        cy.get('input[name="projectnameinput"]').should(
          "have.value", "Project name edited name");
      });
  });

  it("Should edit the description", () => {
    cy.viewport(1920, 1080);
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get('textarea[name="desctextarea"]').type(" I edited this");

        cy.get(".save-button").click();
      });
      cy.on("window:confirm", () => true);

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
    cy.viewport(1920, 1080);

    let initialCollaboratorsCount;
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .find(".user-card")
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
      cy.on("window:confirm", () => true);

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .should("be.lessThan", initialCollaboratorsCount + 1);
      });
  });

  it("Should add two collaborators", () => {
    cy.viewport(1920, 1080);

    let initialCollaboratorsCount;
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .then((length) => {
            initialCollaboratorsCount = length;
          });
      });

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".user-list button").eq(1).click();
        cy.wait(400);
        cy.get(".select-collaborator").select("buenas");
        cy.get(".add-user-button").click();
        cy.get(".select-collaborator").select("Test2");
        cy.get(".add-user-button").click();
        cy.get(".confirm-button").eq(0).click();
      });
    cy.on("window:confirm", () => true);

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .should("eq", initialCollaboratorsCount + 2);
      });
  });

  // Sometimes this test bugs, execute it again when this happen.

  it("Should reverse changes when the cancel button is pressed", () => {
    cy.viewport(1920, 1080);

    let initialCollaboratorsCount;
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .then((length) => {
            initialCollaboratorsCount = length;
          });
        cy.get('textarea[name="desctextarea"]').type(" yeeeeeeeeee");
        cy.get(".user-card button").eq(0).click();
        cy.get(".edit-button").click();
      });

    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.wait(700);
        cy.get(".edit-button").click();
        cy.wait(700);
        cy.get('textarea[name="desctextarea"]').should(
          "have.value",
          "Project description I edited this"
        );
        cy.get(".user-list")
          .find(".user-card")
          .its("length")
          .should("eq", initialCollaboratorsCount);
      });
  });

  it("Should search a project", () => {
    cy.viewport(1920, 1080);
    cy.get('input[name="searchbar"]').type("Project name");
    cy.get(".main-container-div").eq(0).within(() => {
      cy.get(".edit-button").click();
      cy.wait(500);
      cy.get('button[name="editprojectnamebutton"]').click();
      cy.get('input[name="projectnameinput"]').should(
        "have.value", "Project name edited name");
    })
  });

  it("Should download the project file", () => {
    cy.viewport(1920, 1080);
    cy.get(".main-container-div")
      .eq(0)
      .within(() => {
        cy.get(".edit-button").click();
        cy.get(".download-button").click();
        cy.get(".error-message").should("not.exist");
      });
  });

  after(() => {
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
