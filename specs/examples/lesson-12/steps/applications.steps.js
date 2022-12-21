const { When, Then } = require('@wdio/cucumber-framework');
const ApplicationsPage = require("../pages/applications.page");


When('user navigates to page {word}', (_) => {
    ApplicationsPage.goToApplications();
});

When('user enters text into the search field: {string}', (searchString) => {
    ApplicationsPage.searchInTable(searchString);
    ApplicationsPage.waitForTableToLoad();
});

Then('user can see between {int} to {int} applications', (min, max) => {
    const count = ApplicationsPage.getTableRows().length
    expect(count).toBeGreaterThanOrEqual(min);
    expect(count).toBeLessThanOrEqual(max);
});

Then('applications contain valid name\, date\, payment type and remaining amount to pay', () => {
    ApplicationsPage.getTableRows().forEach(row => {
        const values = row.values
        expect(values.name).toMatch(/[a-zA-Z0-9#$@]/);
        expect(values.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
        expect(values.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
        expect(values.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
    })
});

Then('all names on applications contain {string}', (searchString) => {
    ApplicationsPage.getTableRows().forEach(row => {
        const values = row.values
        expect(values.name.toLowerCase()).toContain(searchString);
    });
});

Then('table shows applications:', (table) => {
    ApplicationsPage.getTableRows().forEach((row, index) => {
        const actual = row.values
        const expected = table.hashes()[index];
        expect(actual.name).toEqual(expected.name);
        expect(actual.date).toEqual(expected.date);
        expect(actual.paymentType).toEqual(expected.paymentType);
        expect(actual.toPay).toEqual(expected.toPay);
    })
});
