describe("Login", () => {
  it("should login successfully with valid credentials", () => {
    cy.visit("http://localhost:5173/");

    cy.get('input[name="username"]').type("Hola");
    cy.get('input[name="password"]').type("12345");

    cy.get('input[type="submit"]').click();

    cy.url().should("include", "/home");
  });

  it("should display an error message with invalid credentials", () => {
    cy.visit("http://localhost:5173/");

    cy.get('input[name="username"]').type("usuario_invalido");
    cy.get('input[name="password"]').type("contraseña_invalida");

    cy.get('input[type="submit"]').click();

    cy.contains("Invalid username.").should("exist");
  });

  it("should display an error message with invalid password", () => {
    cy.visit("http://localhost:5173/");

    cy.get('input[name="username"]').type("Hola");
    cy.get('input[name="password"]').type("233424");

    cy.get('input[type="submit"]').click();

    cy.contains("Invalid password.").should("exist");
  });

  it("should not allow more than 30 characters in the username field", () => {
    cy.visit("http://localhost:5173/");

    const longUsername = "a".repeat(31);
    cy.get('input[name="username"]').type(longUsername);

    cy.get('input[name="username"]').should(
      "have.value",
      longUsername.substring(0, 30)
    );
  });

  it("should not allow more than 50 characters in the password field", () => {
    cy.visit("http://localhost:5173/");

    const longPassword = "a".repeat(51);
    cy.get('input[name="password"]').type(longPassword);

    cy.get('input[name="password"]').should(
      "have.value",
      longPassword.substring(0, 50)
    );
  });
});
