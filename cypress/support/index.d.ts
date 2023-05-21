/// <reference types="cypress"/>

declare namespace Cypress{
    interface Chainable{
        verifyLabel(selector: string, expectedValue: string): void
        verifyErrorMessageNonExistent(selector: string): void
        verifyErrorMessage(selector: string, expectedValue: string): void
        resetForm(): void
    }
}