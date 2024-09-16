describe("catalogus test", () => {
  beforeEach(() => {
    cy.visit("https://gamestart.onrender.com/catalogus");
  });

  it("games worden getoont", () => {
    cy.get("[data-cy=catalogus-games]").should("exist");
    cy.get("[data-cy=catalogus-games] .game-card").should("have.length", 9);
  });

  it("filters games by console", () => {
    cy.get("[data-cy=console-filter]").select("ps5");

    cy.get("[data-cy=catalogus-games] [data-cy^=game-card]").each(
      (gameCard) => {
        cy.wrap(gameCard)
          .should("have.attr", "data-cy")
          .and("include", "game-card-ps5");
      }
    );
  });

  it("games worden toegevoegd aan winkelmandje", () => {
    cy.get("[data-cy=catalogus-games] .game-card").first().click();
    cy.get("[data-cy=games-toevoegen]").click();
    cy.get(".cart-container").should("have.class", "open");
    cy.get(".cart li").should("have.length.greaterThan", 0);
  });

  it("games popup kan gesloten worden", () => {
    cy.get("[data-cy=catalogus-games] .game-card").first().click();
    cy.get("[data-cy=game-popup-catalogus]").should("be.visible");
    cy.get("[data-cy=popup-sluiten]").click();
    cy.wait(1000);
    cy.get("[data-cy=game-popup-catalogus]").should("not.exist");
  });
});
