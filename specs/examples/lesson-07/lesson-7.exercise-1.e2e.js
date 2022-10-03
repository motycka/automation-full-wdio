/**
 * Lesson 7: exercise 1
 */
import LoginPage from './pages/login.page.js';
import {username, password} from '../../fixtures.js'

describe('Login Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        LoginPage.open();
    });

    it('should show login page', () => {
        expect(LoginPage.isEnabled()).toEqual(true);
        expect(LoginPage.loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', () => {
        LoginPage.login(username, password)
        expect(LoginPage.pageName).toEqual('Přihlášky');
    });

    it('should not login with invalid credentials', () => {
        LoginPage.login(username, 'spatneheslo')
        expect(LoginPage.pageName).toEqual('Přihlášení');
    });
    
});