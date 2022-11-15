import {username, password} from './fixtures.js'
import LoginPage from '../pages/login.page'
import ApplicationsPage from '../pages/applications.page'

describe('Czechitas Login Page', () => {

    it('should open login page', () => {

        browser.reloadSession();

        browser.url('/prihlaseni');

        browser.pause(5000);

    });

});
