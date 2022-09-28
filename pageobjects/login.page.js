class LoginPage {

    get emailField() { return $('#email') }
    get passwordField() { return $('#password') }
    get loginButton() { return $('.btn-primary') }

    get pageName() {
        return $('h1').getText();
    }

    open() {
        return browser.url('/prihlaseni');
    }

    isEnabled() {
        return this.emailField.isEnabled() && this.passwordField.isEnabled();
    }

    login(username, password) {
        this.emailField.setValue(username);
        this.passwordField.setValue(password);
        this.loginButton.click();
    }

}

module.exports = new LoginPage();