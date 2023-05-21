import { TextInput } from './support/textInput-command';
import { Checkbox } from './support/chekbox-commands';
const selectors = require('./fixtures/selectors.json');

class pageUnderTest {
    constructor(selectors){
        this.fullName = new TextInput(selectors.fullName);
        this.userName = new TextInput(selectors.userName);
        this.email = new TextInput(selectors.email);
        this.password = new TextInput(selectors.password);
        this.confirmPassword = new TextInput(selectors.confirmPassword);
        this.acceptTerms = new Checkbox(selectors.acceptTerms);
    }
}

module.exports = new pageUnderTest(selectors);