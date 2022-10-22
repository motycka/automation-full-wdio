/**
 * Lesson 4: exercise 1
 */
import {username, password, userFullName} from '../fixtures.js'

describe('Login Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
    });

    it('should show login form', () => {

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
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');

        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();

        expect(userNameDropdown.getText()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const toastMessage = $('.toast-message');
        const fieldError = $('.invalid-feedback');

        emailField.setValue(username);
        passwordField.setValue('invalid');
        loginButton.click();

        // na stránce je jednak toast message
        expect(toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // ale také validační message ve formuláři
        expect(fieldError.getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

        // stále vidíme login formulář
        expect(emailField).toBeDisplayed();
        expect(passwordField).toBeDisplayed();
        expect(loginButton).toBeDisplayed();
    });

    it('should logout', () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const navbarRight = $('.navbar-right')
        const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
        const logoutLink = $('#logout-link');

        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();

        // zkontrolujeme, že jsme přihlášeni, jinak by test byl nevalidní
        expect(userNameDropdown.getText()).toEqual(userFullName);

        userNameDropdown.click();
        logoutLink.click();

        expect(userNameDropdown.isDisplayed()).toBeFalsy();
        expect(navbarRight.getText()).toEqual('Přihlásit');
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
        const table = $('.dataTable').$('tbody');
        const rows = table.$$('tr');

        expect(rows.length).toEqual(13);

        rows.forEach(row => {
            console.log(row.getText());
            const cols = row.$$('td');
            expect(cols[0]).toHaveText(/[a-zA-Z]/);
            expect(cols[1]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[2]).toHaveText(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            // nebo
            expect(cols[2]).toHaveText(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
            expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
        })
    });

    it('should filter in applications', () => {
        const searchInput = $('input[type="search"]');
        const table = $('.dataTable').$('tbody')
        const loading = $('#DataTables_Table_0_processing');
        const searchText = 'mar';

        const unfilteredRowsCount = table.$$('tr').length;

        searchInput.setValue(searchText);
        loading.waitForDisplayed({ reverse: true});

        const filteredRows = table.$$('tr');

        expect(filteredRows.length).toBeLessThan(unfilteredRowsCount);

        filteredRows.forEach(row => {
            console.log(row.getText());
            const cols = row.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        });
    });
});
