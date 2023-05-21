/// <reference types="cypress" />

const data = require('../fixtures/data.json');
const selectors = require('../fixtures/selectors.json');
const pageUnderTest = require('../pageUnderTest');

describe('Testing Text Inputs', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));

        // check initial state
        pageUnderTest.fullName.checkValue('');
        pageUnderTest.userName.checkValue('');
        pageUnderTest.email.checkValue('');
        pageUnderTest.password.checkValue('');
        pageUnderTest.confirmPassword.checkValue('');

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
    });

    afterEach(() => {
        cy.resetForm();
 
        pageUnderTest.fullName.checkValue('');
        pageUnderTest.userName.checkValue('');
        pageUnderTest.email.checkValue('');
        pageUnderTest.password.checkValue('');
        pageUnderTest.confirmPassword.checkValue('');

        cy.verifyErrorMessageNonExistent(selectors.fullName);
        cy.verifyErrorMessageNonExistent(selectors.userName);
        cy.verifyErrorMessageNonExistent(selectors.email);
        cy.verifyErrorMessageNonExistent(selectors.password);
        cy.verifyErrorMessageNonExistent(selectors.confirmPassword);
    });

    it('Testing full name label', () => {
        cy.verifyLabel(selectors.fullName, data.fullNameLabel);
    });

    it('Testing full name empty', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.fullName, data.fullNameRequired);
    });

    it('Testing full name', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.fullName, data.fullNameRequired);
        pageUnderTest.fullName.setValue(data.fullName);
        pageUnderTest.fullName.checkValue(data.fullName);
        cy.verifyErrorMessageNonExistent(selectors.fullName);
    });

    it('Testing username label', () => {
        cy.verifyLabel(selectors.userName, data.usernameLabel);
    });

    it('Testing username empty', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.userName, data.userNameRequired);
    });

    it('Testing username 5 characters', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.userName, data.userNameRequired);

        pageUnderTest.userName.setValue(data.userNameShort);
        pageUnderTest.userName.checkValue(data.userNameShort);
        cy.verifyErrorMessage(selectors.userName, data.userNameTooShort);

        pageUnderTest.userName.clear();
        pageUnderTest.userName.setValue(data.fullName);
        pageUnderTest.userName.checkValue(data.fullName);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessageNonExistent(selectors.userName);
    });

    it('Testing username combination numbers and characters', () => {
        pageUnderTest.userName.setValue(data.userNameValid);
        pageUnderTest.userName.checkValue(data.userNameValid);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessageNonExistent(selectors.userName);
    });

    it('Testing email label', () => {
        cy.verifyLabel(selectors.email, data.emailLabel);
    });

    it('Testing email empty', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.email, data.emailRequired);
    });

    it('Testing email invalid1', () => {
        pageUnderTest.email.setValue(data.emailInvalid1);
        pageUnderTest.email.checkValue(data.emailInvalid1);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.email, data.emailInvalidError);
    });

    it('Testing email invalid2', () => {
        pageUnderTest.email.setValue(data.emailInvalid2);
        pageUnderTest.email.checkValue(data.emailInvalid2);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.email, data.emailInvalidError);
    });

    it('Testing email invalid3', () => {
        pageUnderTest.email.setValue(data.emailInvalid3);
        pageUnderTest.email.checkValue(data.emailInvalid3);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.email, data.emailInvalidError);
    });

    it('Testing email invalid4', () => {
        pageUnderTest.email.setValue(data.emailInvalid4);
        pageUnderTest.email.checkValue(data.emailInvalid4);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.email, data.emailInvalidError);
    });

    it('Testing email invalid5', () => {
        pageUnderTest.email.setValue(data.emailInvalid5);
        pageUnderTest.email.checkValue(data.emailInvalid5);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.email, data.emailInvalidError);
    });

    it('Testing email valid', () => {
        pageUnderTest.email.setValue(data.emailValid);
        pageUnderTest.email.checkValue(data.emailValid);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessageNonExistent(selectors.email);
    });

    it('Testing password label', () => {
        cy.verifyLabel(selectors.password, data.passwordLabel);
    });

    it('Testing password empty', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.password, data.passwordRequired);
    });

    it('Testing password short', () => {
        pageUnderTest.password.setValue(data.passwordShort);
        pageUnderTest.password.checkValue(data.passwordShort);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.password, data.passwordTooShort);
    });

    it('Testing password valid', () => {
        pageUnderTest.password.setValue(data.passwordValid);
        pageUnderTest.password.checkValue(data.passwordValid);
        cy.get(selectors.form).submit();
        cy.verifyErrorMessageNonExistent(selectors.password);
    });

    it('Testing password confirmation label', () => {
        cy.verifyLabel(selectors.confirmPassword, data.confirmPasswordLabel)
    });

    it('Testing password confirmation empty', () => {
        cy.get(selectors.form).submit();
        cy.verifyErrorMessage(selectors.confirmPassword, data.confirmPasswordRequired);
    });

    it('Testing password confirmation', () => {
        pageUnderTest.password.verifyPassword();
    });

    it('Testing password confirmation', () => {
        pageUnderTest.confirmPassword.verifyPassword();
    });
});