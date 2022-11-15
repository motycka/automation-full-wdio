class ApplicationsPage {

    get applicationsLink() { return $('=Přihlášky'); }
    get searchField() { return $('input[type="search"]'); }
    get loading() { return $('#DataTables_Table_0_processing'); }
    get table() { return $('.dataTable'); }
    get rows() { return this.table.$('tbody').$$('tr'); }

    goToApplications() {
        this.applicationsLink.click();
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
