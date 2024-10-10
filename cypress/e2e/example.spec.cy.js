describe('service is available', function() {
  let email = 'cyTest@yandex.ru';
  let password = 'password';
  const testUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.viewport(1300, 900);
  });

  it('should be success create order', function() {
    const profileTestId = '[data-testid="profile-tesid"]';
    const loginEmailTestId = '[data-testid="login-email-testInput"]';
    const loginPasswordTestId = '[data-testid="login-password-testInput"]';
    const loginSubmitTestId = '[data-testid="login-submit-testButton"]';
    const logoLinkTestId = '[data-testid="logo-link-testid"]';
    const dropTestId = '[data-testid="drop-testid"]';
    const submitOrderTestId = '[data-testid="submit-order-test"]';
    const orderTitleTestId = '[data-testid="order-test-title"]';
    const closeModalTestId = '[data-testid="testid-close-modal"]';
  
    const testCard0TestId = '[data-testid="test-card-0"]';
    const testCard4TestId = '[data-testid="test-card-4"]';
    const testCard8TestId = '[data-testid="test-card-8"]';
  
    cy.visit(testUrl);
  
    cy.get(profileTestId).click();
  
    cy.url().should('include', '/login');
  
    cy.get(loginEmailTestId).type(email);
    cy.get(loginPasswordTestId).type(password);
    cy.get(loginSubmitTestId).click();
    cy.url().should('include', '/profile')
    cy.get(logoLinkTestId).click()
    cy.url().should('eq', `${testUrl}/`);
  
    cy.get(testCard0TestId).drag(dropTestId);
    cy.get(testCard4TestId).drag(dropTestId);
    cy.get(testCard8TestId).drag(dropTestId);
  
    cy.get(submitOrderTestId).click()
    
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('fetchOrder');
    cy.get(submitOrderTestId).click();
    cy.wait('@fetchOrder').then(() => {
      cy.get(orderTitleTestId).should('be.visible')
    });
    
    cy.get(closeModalTestId).click();
  });

  afterEach(() => {
    cy.get('[data-testid="modal-overlay-testid"]').should('not.exist');
  });
  
 it('should successfully open ingredient-modal and validate ingredient name', () => {
  const testCardTestId = '[data-testid="test-card-0"]';
  const modalOverlayTestId = '[data-testid="modal-overlay-testid"]';
  const ingredientModalTestId = '[data-testid="ingedient-modal-testid2"]';
  const ingredientNameTestId = '[data-testid="name-of-ingerdient-modal"]';
  const cardNameTestId = '[data-testcard="card-name-example-0"]';

  cy.visit(testUrl);
  cy.url().should('eq', `${testUrl}/`);

  cy.get(cardNameTestId).then(($name) => {
    const cardText = $name.text();

    cy.get(testCardTestId).click();

    cy.get(modalOverlayTestId).then(($overlay) => {
      cy.wrap($overlay).find(ingredientModalTestId).should('exist').its('length').should('eq', 1);

      cy.wrap($overlay).find(ingredientNameTestId).should('have.text', cardText);
    });
  });

  cy.url().should('include', '/ingredients/');
  cy.visit(testUrl);
});
  


})
