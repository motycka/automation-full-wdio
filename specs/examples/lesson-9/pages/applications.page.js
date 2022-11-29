import AppPage from './app.page';

class ApplicationsPage extends AppPage {

    get applicationsLink() { return $('=Přihlášky'); }
    get searchField() { return $('input[type="search"]'); }
    get loading() { return $('#DataTables_Table_0_processing'); }
    get table() { return $('.dataTable'); }
    get rows() { return this.table.$('tbody').$$('tr'); }

    goToApplications() {
        this.applicationsLink.click();
    }

    waitForTableToLoad() {
        this.loading.waitForDisplayed({ reverse: true });
    }

    searchInTable(searchText) {
        this.searchField.setValue(searchText);
    }

    getTableRows() {
        this.waitForTableToLoad();
        return this.rows.map(row => {
            return new TableRow(row);
        });
    }
}

class TableRow {

    constructor(rowElement) {
        this.rowElement = rowElement;
    }

    get values() {
        const cols = this.rowElement.$$('td');
        return {
            name: cols[0].getText(),
            date: cols[1].getText(),
            paymentType: cols[2].getText(),
            toPay: cols[3].getText()
        }
    }

    info() {
        this.rowElement.$('[data-can="view"]').click();
        return new ApplicationInfoPage();
    }

}

class ApplicationInfoPage {

    get table() { return $('.table-twocols') }

    getDetail() {
        return this.table.$$('tr').map(row => {
            return row.$$('td').map(col => col.getText());
        });
    }
}

module.exports = new ApplicationsPage();
