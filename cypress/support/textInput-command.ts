export class TextInput {
    selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public setValue(value: string) {
        cy.get(this.selector).find('input').type(value).blur();
    }

    public checkValue(expectedValue: string) {
        cy.get(this.selector).find('input').should('have.value', expectedValue);
    }

    public clear() {
        cy.get(this.selector).find('input').clear();
    }

    public verifyPassword() {
        cy.get(this.selector).find('input').should('have.attr', 'type', 'password');
    }
}