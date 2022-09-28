/**
 * Lesson 4: exercise 1
 */
import {username, password, userFullName} from '../../fixtures.js'

describe('Login Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
    });

    it('should show login page', () => {

        const emailField = $('#email');
        expect(emailField).toBeDisplayed();
        expect(emailField).toBeEnabled();

        const passwordField = $('#password');
        expect(passwordField).toBeDisplayed();
        expect(passwordField).toBeEnabled();

        const loginButton = $('.btn-primary');
        expect(loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', () => {
        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        expect(userNameDropdown.getText()).toEqual(userFullName);
    });
    
    it('should logout', () => {
        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();
        
        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        expect(userNameDropdown.getText()).toEqual(userFullName);

        userNameDropdown.click();
        $('#logout-link').click();

        const loginLink = $('#login');
        expect(loginLink.getText()).toEqual('Přihlásit')

        loginLink.click();
        expect(emailField).toBeDisplayed();
        expect(passwordField).toBeDisplayed();
        expect(loginButton).toBeDisplayed();
    });
});

describe('Applications Page - excercise 4', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
        $('#email').setValue(username);
        $('#password').setValue(password);
        $('.btn-primary').click();
        $('=Přihlášky').click();
    });

    it('should list all applications', () => {    
        const rows = $('.dataTable').$('tbody').$$('tr');
        expect(rows).toBeElementsArrayOfSize(4);
        rows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0].getText()).toMatch(/[a-zA-Z]{3,}/);
            expect(cols[1].getText()).toMatch(/(Python|JavaScript|Automatizované testování)/);
            expect(cols[2].getText()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[3].getText()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        });
    });

    it('should filter in applications', () => {
        const searchText = 'Novák';
        $('input[type="search"]').setValue(searchText);
        const filteredRows = $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        filteredRows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText);
        });
    });

});