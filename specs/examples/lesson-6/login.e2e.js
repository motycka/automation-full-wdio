/**
 * Lesson 6: exercise 1
 */
import {username, password, userFullName} from '../../fixtures.js'

function openLoginPage() {
    browser.reloadSession();
    browser.url('/prihlaseni');
}

function getEmailField() {
    return $('#email');
}

function getPasswordField() {
    return $('#password');
}

function getLoginButton() {
    return $('.btn-primary');
}

function getToast() {
    return $('.toast-message');
}

function getFieldError() {
    return $('.invalid-feedback');
}

function getRightNavbar() {
    return $('.navbar-right');
}

function getUserNameDropdown() {
    return getRightNavbar().$('[data-toggle="dropdown"]');
}

function getLogoutLink() {
    return $('#logout-link');
}

describe('Login Page', () => {

    beforeEach(() => {
        openLoginPage();
    });

    it('should show login form', () => {

        const emailField = getEmailField();
        expect(emailField).toBeDisplayed();
        expect(emailField).toBeEnabled();

        const passwordField = getPasswordField();
        expect(passwordField).toBeDisplayed();
        expect(passwordField).toBeEnabled();

        const loginButton = getLoginButton();
        expect(loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', () => {

        getEmailField().setValue(username);
        getPasswordField().setValue(password);
        getLoginButton().click();

        expect(getUserNameDropdown().getText()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', () => {
        const emailField = getEmailField();
        const passwordField = getPasswordField();
        const loginButton = getLoginButton();

        emailField.setValue(username);
        passwordField.setValue('invalid');
        loginButton.click();

        // na stránce je jednak toast message
        expect(getToast().getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // ale také validační message ve formuláři
        expect(getFieldError().getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

        // stále vidíme login formulář
        expect(emailField).toBeDisplayed();
        expect(passwordField).toBeDisplayed();
        expect(loginButton).toBeDisplayed();
    });

    it('should logout', () => {
        getEmailField().setValue(username);
        getPasswordField().setValue(password);
        getLoginButton().click();

        // zkontrolujeme, že jsme přihlášeni, jinak by test byl nevalidní
        expect(getUserNameDropdown().getText()).toEqual(userFullName);

        getUserNameDropdown().click();
        getLogoutLink().click();

        expect(getUserNameDropdown().isDisplayed()).toBeFalsy();
        expect(getRightNavbar().getText()).toEqual('Přihlásit');
    });
});
