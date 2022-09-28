/**
 * Lesson 1: exercise 1
 */
describe('Czechitas Login Page', () => {

    it('should open login page', () => {
        
        browser.reloadSession();
        
        browser.url('/prihlaseni');
        
        const windowSize = browser.getWindowSize();
        console.log(windowSize);

        const allCookies = browser.getCookies();
        console.log(allCookies);
        browser.saveScreenshot('login_page.png');

        browser.pause(5000);
        
    });
    
});