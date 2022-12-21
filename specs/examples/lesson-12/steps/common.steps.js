const { Given } = require('@wdio/cucumber-framework');
const LoginPage = require('../pages/login.page');
const {username, password, userFullName, resolvePlaceholder} = require('../fixtures');


Given('user is on the Czechitas login page', () => {
    LoginPage.open();
});


Given('user {string} is logged in', (user) => {
    switch (resolvePlaceholder(user)) {
        case userFullName:
            LoginPage.login(username, password);
            break;
        default:
            throw Error(`Undefined user ${user}`);
    }
});
