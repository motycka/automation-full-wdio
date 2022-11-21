import AppPage from './app.page';

class LoginPage extends AppPage {

    constructor() {
        super();
        this.url = '/prihlaseni';
    }

    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('.btn-primary'); }
    get fieldError() { return $('.invalid-feedback'); }

    open() {
        browser.reloadSession();
        browser.url(this.url);
    }

    login(username, password) {
        this.emailField.setValue(username);
        this.passwordField.setValue(password);
        this.loginButton.click();
    }

    getFieldError() {
        return this.fieldError.getText();
    }

}

module.exports = new LoginPage();
