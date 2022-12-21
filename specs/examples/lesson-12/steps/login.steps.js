const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pages/login.page');
const {resolvePlaceholder} = require("../fixtures");

Given('user provides username {word} and password {word}', (username, password) => {
    LoginPage.emailField.setValue(resolvePlaceholder(username));
    LoginPage.passwordField.setValue(resolvePlaceholder(password));
});

When('user clicks on login button', () => {
    LoginPage.loginButton.click();
});

When('user clicks on logout in the navbar', () => {
    LoginPage.logout();
});

Then('user sees {word} link in the navbar', (linkName) => {
    expect(LoginPage.navbarRight).toHaveText(linkName);
});

Then('user sees login form with button {word}', (buttonText) => {
    expect(LoginPage.emailField).toBeDisplayed();
    expect(LoginPage.emailField).toBeEnabled();
    expect(LoginPage.passwordField).toBeDisplayed();
    expect(LoginPage.passwordField).toBeEnabled();
    expect(LoginPage.loginButton).toBeDisplayed();
    expect(LoginPage.loginButton).toBeEnabled();
    expect(LoginPage.loginButton).toHaveText(buttonText);
});

Then('user is logged in as {string}', (userFullName) => {
    expect(LoginPage.getCurrentUser()).toEqual(resolvePlaceholder(userFullName));
});

Then('toast message pops up: {string}', (message) => {
    expect(LoginPage.getToastMessage()).toEqual(message);
});

Then('login form error is shown: {string}', (error) => {
    expect(LoginPage.getFieldError()).toEqual(error)
});


