/// <reference types="cypress" />

Cypress.Commands.add('verifyLabel', (selector: string, expectedValue: string)=>{
    cy.get(selector).find('label').should('have.text', expectedValue);
});

Cypress.Commands.add('verifyErrorMessageNonExistent', (selector: string)=>{
    cy.get(selector).find('.invalid-feedback').should('not.exist');
});

Cypress.Commands.add('verifyErrorMessage', (selector: string, expectedValue: string) =>{
    cy.get(selector).find('.invalid-feedback').should('contain.text', expectedValue);
});

Cypress.Commands.add('resetForm', () =>{
    cy.get('[type="button"]').click();
});
