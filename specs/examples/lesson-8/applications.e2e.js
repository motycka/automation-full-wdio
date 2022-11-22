/**
 * Lesson 8
 */
import {username, password} from '../../fixtures.js'
import LoginPage from './pages/login.page';
import ApplicationsPage from './pages/applications.page';

describe('Applications Page', () => {

    beforeEach(() => {
        LoginPage.open();
        LoginPage.login(username, password)
        ApplicationsPage.goToApplications();
    });

    it('should list all applications', () => {
        const rows = ApplicationsPage.getTableRows();

        expect(rows.length).toEqual(13);

        rows.forEach(row => {
            console.log(row);
            expect(row.name).toMatch(/[a-zA-Z]/);
            expect(row.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(row.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            expect(row.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        });
    });

    it('should filter in applications', () => {
        const searchText = 'mar';

        const unfilteredRows = ApplicationsPage.getTableRows();

        ApplicationsPage.searchInTable(searchText);

        const filteredRows = ApplicationsPage.getTableRows();
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        filteredRows.forEach(row => {
            console.log(row);
            expect(row.name.toLowerCase()).toContain(searchText);
        });
    });
});
