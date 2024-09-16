describe("registratie test", () => {
  beforeEach(() => {
    cy.visit("https://gamestart.onrender.com/");
    cy.get("[data-cy=registreer-button]").click();
  });
  it("should register a new user successfully", () => {
    cy.fixture("successfulRegistration").as("successfulRegistration");

    cy.intercept("POST", "/api/users/register", (req) => {
      req.reply({
        statusCode: 200,
        body: "@successfulRegistration",
      });
    }).as("registrationRequest");

    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpassword");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.wait("@registrationRequest");

    cy.get("[data-cy=error-message]").should("not.exist");
    cy.url().should("include", "/login");
  });

  it("failed registratie - username", () => {
    cy.get("[data-cy=username-input]").type(
      "test_name123456789123456789123456789123456789789789789789"
    );
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpassword");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=username-error]").should("exist");
  });

  it("failed registratie - email", () => {
    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test@examplecom");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpassword");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=email-error]").should("exist");
  });

  it("failed registratie - password", () => {
    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("tes");
    cy.get("[data-cy=confirmPassword-input]").type("tes");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=password-error]").should("exist");
  });

  it("failed registratie - confirm password", () => {
    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpasswor");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=confirmPassword-error]").should("exist");
  });

  it("failed registratie - naam", () => {
    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpassword");
    cy.get("[data-cy=name-input]").type(
      "test123456789123456789123456789123456789123456789123456789"
    );
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=naam-error]").should("exist");
  });

  it("failed registratie - familienaam", () => {
    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test@example.com");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpassword");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type(
      "name123456789123456789123456789123456789123456789123456789"
    );
    cy.get("[data-cy=geboortedatum-input]").type("2000-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=familienaam-error]").should("exist");
  });

  it("failed registratie - geboortedatum", () => {
    cy.get("[data-cy=username-input]").type("test_name");
    cy.get("[data-cy=email-input]").type("test2@example.com");
    cy.get("[data-cy=password-input]").type("testpassword");
    cy.get("[data-cy=confirmPassword-input]").type("testpassword");
    cy.get("[data-cy=name-input]").type("test");
    cy.get("[data-cy=familynaam-input]").type("name");
    cy.get("[data-cy=geboortedatum-input]").type("2018-01-17");

    cy.get("[data-cy=register-button]").click();

    cy.get("[data-cy=geboortedatum-error]").should("exist");
  });

  it("registreer scherm sluiten", () => {
    cy.get(".modal").should("be.visible");

    cy.get("[data-cy=close-button]").click();

    cy.get(".modal").should("not.exist");
  });
});
