class AppPage {

    get toast() { return $('.toast-message'); }
    get navbarRight() { return $('.navbar-right'); }
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); }
    get logoutLink() { return $('#logout-link'); }

    getToastMessage() {
        return this.toast.getText();
    }

    logout() {
        this.userNameDropdown.click();
        this.logoutLink.click();
    }

    getCurrentUser() {
        return this.userNameDropdown.getText();
    }

}

module.exports = AppPage;
