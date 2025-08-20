declare namespace Cypress {
  interface Chainable<Subject> {
    login: typeof login;
    dataTest: (value: string) => Chainable<JQuery<HTMLElement>>;
  }
}
const dataTest = (value: string, options = {}): Chainable<JQuery<HTMLElement>> => {
  return cy.get(`[data-test="${value}"]`, options);
};

const login = (username: string, password: string): void => {
  cy.dataTest('username').type(username);
  cy.dataTest('password').type(password);
  cy.dataTest('login-button').click();
};

Cypress.Commands.add('dataTest', dataTest);
Cypress.Commands.add('login', login);
