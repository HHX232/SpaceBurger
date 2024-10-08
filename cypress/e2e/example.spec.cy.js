describe('service is available', function() {
  let email = 'cyTest@yandex.ru';
  let name = 'SomeName';
  let password = 'password';

  beforeEach(() => {
    cy.viewport(1300, 900);
  });

  it('should be success create order', function() {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="profile-tesid"]').click();

    cy.url().should('include', '/login');

    cy.get('[data-testid="login-email-testInput"]').type(email);
    cy.get('[data-testid="login-password-testInput"]').type(password);
    cy.get('[data-testid="login-submit-testButton"]').click();
    cy.url().should('include', '/profile')
    cy.get('[data-testid="logo-link-testid"]').click()
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('[data-testid="test-card-0"]').drag('[data-testid="drop-testid"]');
    cy.get('[data-testid="test-card-4"]').drag('[data-testid="drop-testid"]');
    cy.get('[data-testid="test-card-8"]').drag('[data-testid="drop-testid"]');

    cy.get('[data-testid="submit-order-test"]').click()
    
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('fetchOrder');
    cy.get('[data-testid="submit-order-test"]').click();
    cy.wait('@fetchOrder').then(() => {
      cy.get('[data-testid="order-test-title"]').should('be.visible')
    });
    
    cy.get('[data-testid="testid-close-modal"]').click();
  });

  afterEach(() => {
    cy.get('[data-testid="modal-overlay-testid"]').should('not.exist');
  });
  
  it('should successfully open ingredient-modal and validate ingredient name', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('eq', 'http://localhost:3000/');
  
    cy.get('[data-testcard="card-name-example-0"]').then(($name) => {
      const cardText = $name.text();

      cy.get('[data-testid="test-card-0"]').click();
  
      cy.get('[data-testid="modal-overlay-testid"]').then(($overlay) => {
        cy.wrap($overlay).find('[data-testid="ingedient-modal-testid2"]').should('exist').its('length').should('eq', 1);
  
        cy.wrap($overlay).find('[data-testid="name-of-ingerdient-modal"]').should('have.text', cardText);
      });
    });
  
    cy.url().should('include', '/ingredients/');
    cy.visit('http://localhost:3000');
  });
  


})
