/// <reference types="cypress" />

const data = require('../fixtures/data.json');
const selectors = require('../fixtures/selectors.json');
const pageUnderTest = require('../pageUnderTest');

describe('Testing Checkbox Inputs', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));

        // check initial state
        pageUnderTest.acceptTerms.checkValue(false);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });

    afterEach(() => {
        cy.resetForm();

        pageUnderTest.acceptTerms.checkValue(false);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });

    it('Testing accept terms label', () => {
        cy.verifyLabel(selectors.acceptTerms, data.termsLabel);
    });

    it('Testing accept terms empty', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.acceptTerms, data.acceptTermsRequired)
    });

    it('Testing accept terms set value', () => {
        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(true);
    });

    it('Testing accept terms set and change', () => {
        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(true);

        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(false);
    });

    it('Testing accept terms error message disappears', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.acceptTerms, data.acceptTermsRequired);

        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(true);

        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });
});