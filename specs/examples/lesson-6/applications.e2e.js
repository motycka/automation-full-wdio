/**
 * Lesson 6: exercise 2
 */
import {username, password} from '../../fixtures.js'

function openLoginPage() {
    browser.reloadSession();
    browser.url('/prihlaseni');
}

function login(username, password) {
    $('#email').setValue(username);
    $('#password').setValue(password);
    $('.btn-primary').click();
}

function goToApplications() {
    $('=Přihlášky').click();
}

function waitForTableToLoad() {
    $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true});
}

function searchInTable(searchText) {
    $('input[type="search"]').setValue(searchText);
}

function getTableRows() {
    waitForTableToLoad(); // funkce mohou volat jiné funkce
    return $('.dataTable').$('tbody').$$('tr');
}

describe('Applications Page', () => {

    beforeEach(() => {
        openLoginPage();
        login(username, password);
        goToApplications();
    });

    it('should list all applications', () => {
        const rows = getTableRows();

        expect(rows.length).toEqual(13);

        rows.forEach(row => {
            console.log(row.getText());
            const cols = row.$$('td');
            expect(cols[0]).toHaveText(/[a-zA-Z]/);
            expect(cols[1]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[2]).toHaveText(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
            expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
        });
    });

    it('should filter in applications', () => {
        const searchText = 'mar';

        const unfilteredRows = getTableRows();

        searchInTable(searchText);

        const filteredRows = getTableRows();
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        filteredRows.forEach(row => {
            console.log(row.getText());
            const cols = row.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        });
    });
});
