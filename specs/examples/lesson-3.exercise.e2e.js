/**
 * Lesson 3: exercise 1
 */
import {username, password} from '../fixtures.js'

describe('Login Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
    });

    it('should login with valid credentials', () => {
        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('User currently logged in: ' + userNameDropdown.getText());
    });

    it('should not login with invalid credentials', () => {

        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        emailField.setValue(username);
        passwordField.setValue('invalid');
        loginButton.click();

        // na stránce je jednak toast message
        const toastMessage = $('.toast-message')
        console.log('Error: ' + toastMessage.getText());

        // ale také validační message ve formuláři
        const fieldError = $('.invalid-feedback');
        console.log('Field error: ' + fieldError.getText());

        console.log('Email field is dislayed: ' + emailField.isDisplayed());
        console.log('Password field is dislayed: ' + passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + loginButton.isDisplayed());
    });

    it('should logout', () => {
        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const navbarRight = $('.navbar-right')
        const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
        const logoutLink = $('#logout-link');

        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();

        console.log('User currently logged in: ' + userNameDropdown.getText());

        userNameDropdown.click();
        logoutLink.click();

        console.log('Email field is dislayed: ' + emailField.isDisplayed());
        console.log('Password field is dislayed: ' + passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + loginButton.isDisplayed());
        console.log('User is logged in: ' + userNameDropdown.isDisplayed());
        console.log('Navbar text: ' + navbarRight.getText());
    });
});

describe('Applications Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
        $('#email').setValue(username);
        $('#password').setValue(password);
        $('.btn-primary').click();
        $('a=Přihlášky').click();
    });

    it('should list all applications', () => {
        const rows = $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table:');
        rows.forEach(row => {
            console.log(row.getText());
        })
    });

    it.only('should filter in applications', () => {
        const searchInput = $('input[type="search"]');
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        searchInput.setValue(searchText);
        loading.waitForDisplayed({ reverse: true});

        const rows = $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table:');
        rows.forEach(row => {
            console.log(row.getText());
        });
    });
});
