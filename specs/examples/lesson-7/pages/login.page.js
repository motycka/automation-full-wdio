class LoginPage {

    constructor() {
        this.url = '/prihlaseni';
    }

    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('.btn-primary'); }
    get fieldError() { return $('.invalid-feedback'); }
    get toast() { return $('.toast-message'); }
    get navbarRight() { return $('.navbar-right'); }
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); }
    get logoutLink() { return $('#logout-link'); }

    open() {
        browser.reloadSession();
        browser.url(this.url);
    }

    login(username, password) {
        this.emailField.setValue(username);
        this.passwordField.setValue(password);
        this.loginButton.click();
    }

    logout() {
        this.userNameDropdown.click();
        this.logoutLink.click();
    }

    getCurrentUser() {
        return this.userNameDropdown.getText();
    }

    getFieldError() {
        return this.fieldError.getText();
    }

    getToastMessage() {
        return this.toast.getText();
    }

}

module.exports = new LoginPage();
