class ApplicationsPage {

    constructor() {
        this.url = '/admin/prihlasky';
    }

    get table() { return $('.dataTable'); }
    get rows() { return this.table.$('tbody').$$('tr'); }
    get loading() { return $('#DataTables_Table_0_processing'); }
    get searchField() { return $('input[type="search"]'); }

    open() {
        browser.url(this.url);
    }

    waitForTableToLoad() {
        this.loading.waitForDisplayed({ reverse: true});
    }

    searchInTable(searchText) {
        this.searchField.setValue(searchText);
    }

    getTableRows() {
        this.waitForTableToLoad();
        return this.rows;
    }
}

module.exports = new ApplicationsPage();
