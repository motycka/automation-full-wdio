/**
 * Lesson 9
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
            const values = row.values;
            console.log(values);
            expect(values.name).toMatch(/[a-zA-Z]/);
            expect(values.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(values.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            expect(values.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        });
    });

    it('should filter in applications', () => {
        const searchText = 'mar';

        const unfilteredRows = ApplicationsPage.getTableRows();

        ApplicationsPage.searchInTable(searchText);

        const filteredRows = ApplicationsPage.getTableRows();
        expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        filteredRows.forEach(row => {
            const values = row.values;
            console.log(values);
            expect(values.name.toLowerCase()).toContain(searchText);
        });
    });

    it('should open application detail', () => {

        // vybere třetí přihlášku v tabulce (musí tam samozřejmě být alespoň 3)
        const tableRow = ApplicationsPage.getTableRows()[2]
        const [lastName, firstName] = tableRow.values.name.split(' ');

        // otevře detail přihlášky
        const applicationDetailPage = tableRow.info();

        // získá obsah detailu přihlášky
        const applicationDetail = applicationDetailPage.getDetail();

        expect(applicationDetail).toContainEqual(['Křestní jméno žáka:', firstName]);
        expect(applicationDetail).toContainEqual(['Příjmení žáka:', lastName]);
    });
});
