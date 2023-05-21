/// <reference types="cypress" />

const data = require('../fixtures/data.json');
const selectors = require('../fixtures/selectors.json');
const pageUnderTest = require('../pageUnderTest');

describe('Testing Registration', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));

        // check initial state
        pageUnderTest.fullName.checkValue('');
        pageUnderTest.userName.checkValue('');
        pageUnderTest.email.checkValue('');
        pageUnderTest.password.checkValue('');
        pageUnderTest.confirmPassword.checkValue('');
        pageUnderTest.acceptTerms.checkValue('');

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });

    afterEach(() => {
        cy.resetForm();

        pageUnderTest.fullName.checkValue('');
        pageUnderTest.userName.checkValue('');
        pageUnderTest.email.checkValue('');
        pageUnderTest.password.checkValue('');
        pageUnderTest.confirmPassword.checkValue('');
        pageUnderTest.acceptTerms.checkValue('');

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });

    it('Testing 1/6 fields correct', () => {
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);

        cy.get(selectors.form).submit();
        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessage(selectors.userName, data.userNameRequired);
        cy.verifyErrorMessage(selectors.password, data.passwordRequired);
        cy.verifyErrorMessage(selectors.email, data.emailRequired);
        cy.verifyErrorMessage(selectors.confirmPassword, data.confirmPasswordRequired);
        cy.verifyErrorMessage(selectors.acceptTerms, data.acceptTermsRequired);
    });

    it('Testing 2/6 fields correct', () => {
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);

        pageUnderTest.password.setValue(data.passwordValid);
        pageUnderTest.password.checkValue(data.passwordValid);

        cy.get(selectors.form).submit();
        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessage(selectors.userName, data.userNameRequired);
        cy.verifyErrorMessage(selectors.email, data.emailRequired);
        cy.verifyErrorMessage(selectors.confirmPassword, data.confirmPasswordRequired);
        cy.verifyErrorMessage(selectors.acceptTerms, data.acceptTermsRequired);
    });

    it('Testing passwords not matched', () => {
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);

        pageUnderTest.userName.setValue(data.userNameValid);
        pageUnderTest.userName.checkValue(data.userNameValid);

        pageUnderTest.email.setValue(data.emailValid);
        pageUnderTest.email.checkValue(data.emailValid);

        pageUnderTest.password.setValue(data.passwordValid);
        pageUnderTest.password.checkValue(data.passwordValid);

        pageUnderTest.confirmPassword.setValue(data.fullName);
        pageUnderTest.confirmPassword.checkValue(data.fullName);

        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(true);

        cy.get(selectors.form).submit();

        cy.verifyErrorMessage(selectors.confirmPassword, data.confirmPasswordNoMatch)
        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });

    it('Testing username too short', () => {
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);

        pageUnderTest.userName.setValue(data.userNameShort);
        pageUnderTest.userName.checkValue(data.userNameShort);

        pageUnderTest.email.setValue(data.emailValid);
        pageUnderTest.email.checkValue(data.emailValid);

        pageUnderTest.password.setValue(data.passwordValid);
        pageUnderTest.password.checkValue(data.passwordValid);

        pageUnderTest.confirmPassword.setValue(data.passwordValid);
        pageUnderTest.confirmPassword.checkValue(data.passwordValid);

        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(true);

        cy.get(selectors.form).submit();

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessage(selectors.userName, data.userNameTooShort);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });

    it('Testing accept terms missing', () => {
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);

        pageUnderTest.userName.setValue(data.userNameValid);
        pageUnderTest.userName.checkValue(data.userNameValid);

        pageUnderTest.email.setValue(data.emailValid);
        pageUnderTest.email.checkValue(data.emailValid);

        pageUnderTest.password.setValue(data.passwordValid);
        pageUnderTest.password.checkValue(data.passwordValid);

        pageUnderTest.confirmPassword.setValue(data.passwordValid);
        pageUnderTest.confirmPassword.checkValue(data.passwordValid);

        cy.get(selectors.form).submit();

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
        cy.verifyErrorMessage(selectors.acceptTerms, data.acceptTermsRequired);
    });

    it('Testing all fields correct', () => {
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);

        pageUnderTest.userName.setValue(data.userNameValid);
        pageUnderTest.userName.checkValue(data.userNameValid);

        pageUnderTest.email.setValue(data.emailValid);
        pageUnderTest.email.checkValue(data.emailValid);

        pageUnderTest.password.setValue(data.passwordValid);
        pageUnderTest.password.checkValue(data.passwordValid);

        pageUnderTest.confirmPassword.setValue(data.passwordValid);
        pageUnderTest.confirmPassword.checkValue(data.passwordValid);

        pageUnderTest.acceptTerms.setValue();
        pageUnderTest.acceptTerms.checkValue(true);

        cy.get(selectors.form).submit();

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
        cy.verifyErrorMessageNonExistent(selectors.acceptTerms);
    });
});