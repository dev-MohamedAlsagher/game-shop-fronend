describe("Bestellingen -geen bestellingen", () => {
  beforeEach(() => {
    cy.login("testFront@example.com", "12345678");
    cy.wait(6000);
  });

  it('toont "geen bestellingen gevonden"', () => {
    cy.get('button:contains("Account")').click();
    cy.get('a:contains("Bestellingen")').click();
    cy.get("[data-cy=no-bestellingen]")
      .should("be.visible")
      .contains("Geen bestellingen gevonden");
  });
});

describe("Bestellingen", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/bestelling", {
      fixture: "bestellingMock.json",
    }).as("getBestellingen");

    cy.login("testFront@example.com", "12345678");
    cy.wait(6000);

    cy.get('button:contains("Account")').click();
    cy.get('a:contains("Bestellingen")').click();
  });

  it("toont bestellingen", () => {
    cy.get("[data-cy=bestelling-0]").should("be.visible");
  });

  it("redirect naar game details", () => {
    cy.get("[data-cy=bestelling-game-0]").first().click();
    cy.url().should("include", "/catalogus");
  });
});
