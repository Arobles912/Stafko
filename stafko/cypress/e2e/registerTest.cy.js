describe("Register", () => {
  it("Should register a new user", () => {
    cy.visit("http://localhost:5173/register");

    cy.get('input[name="username"]').type("Test");
    cy.get('input[name="password"]').type("2468");
    cy.get('input[name="email"]').type("test@gmail.com");

    cy.get('input[name="checkbox-input"]').click();

    cy.get('input[type="submit"]').click();

    cy.url().should("not.include", "/register");

    return cy
      .request("GET", "http://localhost:3000/api/staff/username/Test")
      .then((response) => {
        const userData = response.body;
        return cy.request(
          "DELETE",
          `http://localhost:3000/api/staff/${userData.staff_id}`
        );
      });
  });

  it("Should display an error message with the username already existing", () => {
    cy.visit("http://localhost:5173/register");

    cy.get('input[name="username"]').type("Hola");
    cy.get('input[name="password"]').type("2468");
    cy.get('input[name="email"]').type("test@gmail.com");

    cy.get('input[name="checkbox-input"]').click();

    cy.get('input[type="submit"]').click();

    cy.contains("Username already exists.").should("exist");
  });

  it("Should display an error with an email already in use", () => {
    cy.visit("http://localhost:5173/register");

    cy.get('input[name="username"]').type("Test2");
    cy.get('input[name="password"]').type("2468");
    cy.get('input[name="email"]').type("hola@gmail.com");

    cy.get('input[name="checkbox-input"]').click();

    cy.get('input[type="submit"]').click();

    cy.url().should("include", "/register");
  });

  it("Should not allow more than 30 characters in the username field", () => {
    cy.visit("http://localhost:5173/register");

    const longUsername = "a".repeat(31);
    cy.get('input[name="username"]').type(longUsername);

    cy.get('input[name="username"]').should(
      "have.value",
      longUsername.substring(0, 30)
    );
  });

  it("Should not allow more than 50 characters in the password field", () => {
    cy.visit("http://localhost:5173/register");

    const longPassword = "a".repeat(51);
    cy.get('input[name="password"]').type(longPassword);

    cy.get('input[name="password"]').should(
      "have.value",
      longPassword.substring(0, 50)
    );
  });

  it("Should display error for invalid email format", () => {
    cy.visit("http://localhost:5173/register");

    cy.get('input[name="username"]').type("TestUser");
    cy.get('input[name="password"]').type("123456");

    cy.get('input[name="email"]').type("correo-invalido");

    cy.get('input[name="checkbox-input"]').click();

    cy.get('input[type="submit"]').click();

    cy.url().should("include", "/register");
  });

  it("Should display an error when the checkbox isn't marked", () => {
    cy.visit("http://localhost:5173/register");

    cy.get('input[name="username"]').type("TestUser");
    cy.get('input[name="password"]').type("123456");

    cy.get('input[name="email"]').type("testuser@gmail.com");

    cy.get('input[type="submit"]').click();

    cy.url().should("include", "/register");
  });
});
