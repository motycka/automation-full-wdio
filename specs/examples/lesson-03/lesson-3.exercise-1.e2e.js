/**
 * Lesson 3: exercise 1
 */
import {username, password} from '../../fixtures.js'

describe('Login And Applications Page', () => {

    it('should login and list applications', () => {

        browser.reloadSession();

        browser.url('/prihlaseni');

        // zjištění stavu políčka email
        const emailField = $('#email');
        expect(emailField).toBeDisplayed();
        expect(emailField).toBeEnabled();
        
        // zjištění stavu políčka password
        const passwordField = $('#password');
        expect(passwordField).toBeDisplayed();
        expect(passwordField).toBeEnabled();
        
        // výpis textu tlačítka na přihlášení
        const loginButton = $('.btn-primary');
        expect(loginButton.getText()).toEqual('Přihlásit');
        // nebo
        // expect(loginButton).toHaveTextContaining('Přihlásit')

        // výpis atributu href odkazu a zapomenuté heslo
        const odkaz = $('form').$('a').getAttribute('href');
        expect(odkaz).toEqual(browser.options.baseUrl + '/zapomenute-heslo')

        // přihlášení
        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();

        // přechod na stránku s kurzy
        $('=Přihlášky').click();

        // výpis přihlášených kurzů
        const rows = $('.dataTable').$('tbody').$$('tr')
        expect(rows).toBeElementsArrayOfSize(4);
        rows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0].getText()).toMatch(/[a-zA-Z]{3,}/);
            expect(cols[1].getText()).toMatch(/(Python|JavaScript|Automatizované testování)/);
            expect(cols[2].getText()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[3].getText()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        });

        // Bonus - filtrování tabulky
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