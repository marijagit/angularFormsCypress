export class Checkbox {
    selector: string;
    constructor(selector: string) {
        this.selector = selector;
    }

    public setValue() {
        cy.get(this.selector).find('input').click();
    }

    public checkValue(expectedValue: boolean) {
        if (expectedValue) {
            cy.get(this.selector).find('input').should('have.class', 'ng-valid');
        } else {
            cy.get(this.selector).find('input').should('have.class', 'ng-invalid');
        }
    }
}