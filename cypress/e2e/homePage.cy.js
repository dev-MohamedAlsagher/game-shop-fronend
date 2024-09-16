describe("homePagine test", () => {
  it("verander naar catalogus", () => {
    cy.visit("https://gamestart.onrender.com/");
    cy.get('[data-cy=switch-catalogus]').click();
    cy.url().should('eq', "https://gamestart.onrender.com/catalogus");
  });
});

