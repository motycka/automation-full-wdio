/**
 * Lesson 7: exercise 1
 */
import {username, password} from '../../fixtures.js'
import LoginPage from './pages/login.page';
import ApplicationsPage from './pages/applications.page';

describe('Applications Page', () => {

    beforeEach(() => {
        LoginPage.open();
        LoginPage.login(username, password)
        ApplicationsPage.open();
    });

    it('should list all applications', () => {
        const rows = ApplicationsPage.getTableRows();

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

        const unfilteredRows = ApplicationsPage.getTableRows();

        ApplicationsPage.searchInTable(searchText);

        const filteredRows = ApplicationsPage.getTableRows();
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        filteredRows.forEach(row => {
            console.log(row.getText());
            const cols = row.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText, { ignoreCase: true });
        });
    });
});
