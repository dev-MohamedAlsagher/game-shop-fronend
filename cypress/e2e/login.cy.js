describe('Login Page', () => {
  beforeEach(() => {
    cy.visit("https://gamestart.onrender.com/login");
  });

  it('should successfully login with valid credentials', () => {

    cy.intercept('POST', '/api/users/login', {
      statusCode: 200,
      body: { token: 'mockedToken' },
    }).as('loginRequest');

    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('password123');
    cy.get('[data-cy=login-button]').click();


    cy.wait('@loginRequest');

    cy.url().should('not.include', '/login');
  });

  it('should display an error message with invalid credentials', () => {

    cy.get('[data-cy=email-input]').type('invalid@example.com');
    cy.get('[data-cy=password-input]').type('invalidpassword');
    cy.get('[data-cy=login-button]').click();

    cy.get('[data-cy=login-error]').should('be.visible').and('contain', 'Invalid credentials. Please try again.');
  });
});