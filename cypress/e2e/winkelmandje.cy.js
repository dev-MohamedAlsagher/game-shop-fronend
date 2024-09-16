describe("winkelmand test", () => {
  beforeEach(() => {
    cy.visit("https://gamestart.onrender.com/catalogus");
    cy.get("[data-cy=catalogus-games] .game-card").first().click();
    cy.get("[data-cy=games-toevoegen]").click();
    cy.get("[data-cy=cart-container]").should("have.class", "open");
    cy.get(".cart li").should("have.length.greaterThan", 0);
  });

  it("hoeveelheid games verhoogt", () => {
    cy.get("[data-cy=increase-quantity]").click();
    cy.get("[data-cy=quantity]").should("have.text", "2");
  });

  it("hoeveelheid games verlaagt", () => {
    cy.get("[data-cy=increase-quantity]").click();
    cy.get("[data-cy=quantity]").should("have.text", "2");
    cy.get("[data-cy=decrease-quantity]").click();
    cy.get("[data-cy=quantity]").should("have.text", "1");
  });

  it("verwijder game uit mandje", () => {
    cy.get("[data-cy=remove-button]").click();
    cy.get(".cart li").should("have.length", 0);
  });

  it("redirect naar login wanneer niet ingelogd", () => {
    cy.get("[data-cy=pay-button]").click();
    cy.url().should("include", "/login");
  });
});
