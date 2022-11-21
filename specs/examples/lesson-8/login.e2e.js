/**
 * Lesson 7: exercise 1
 */
import {username, password, userFullName} from '../../fixtures.js'
import LoginPage from './pages/login.page'

describe('Login Page', () => {

    beforeEach(() => {
        LoginPage.open();
    });

    it('should show login form', () => {
        expect(LoginPage.emailField).toBeDisplayed();
        expect(LoginPage.emailField).toBeEnabled();
        expect(LoginPage.passwordField).toBeDisplayed();
        expect(LoginPage.passwordField).toBeEnabled();
        expect(LoginPage.loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', () => {

        LoginPage.login(username, password)

        expect(LoginPage.getCurrentUser()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', () => {

        LoginPage.login(username, 'invalid');

        // na stránce je jednak toast message
        expect(LoginPage.getToastMessage()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // ale také validační message ve formuláři
        expect(LoginPage.getFieldError()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.')

        // stále vidíme login formulář
        expect(LoginPage.emailField).toBeDisplayed();
        expect(LoginPage.passwordField).toBeDisplayed();
        expect(LoginPage.loginButton).toBeDisplayed();
    });

    it('should logout', () => {
        LoginPage.login(username, password);

        // zkontrolujeme, že jsme přihlášeni, jinak by test byl nevalidní
        expect(LoginPage.getCurrentUser()).toEqual(userFullName);

        LoginPage.logout()

        expect(LoginPage.userNameDropdown.isDisplayed()).toBeFalsy();
        expect(LoginPage.navbarRight.getText()).toEqual('Přihlásit');
    });
});
