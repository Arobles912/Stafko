describe("Add projects", () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:4000/api/auth/login').as('loginRequest');

    cy.visit('http://localhost:5173');
    cy.get('input[name="username"]').type('Hola');
    cy.get('input[name="password"]').type('12345');
    cy.get('input[type="submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      const token = interception.response.body.token;
      
      window.localStorage.setItem('token', token);
    });
  });


  it("Should add a project", () => {
    cy.visit("http://localhost:5173/home");

    cy.get('button[name="addproject"]').click();
    cy.get('input[name="projectname"]').type('Project name');
    cy.get('textarea[name="projectdesc"]').type('Project description');

  });
});
