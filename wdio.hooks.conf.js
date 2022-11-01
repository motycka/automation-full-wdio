const fs = require('fs');
const passedDirectory = 'screenshots/passed';
const failedDirectory = 'screenshots/failed';

function createIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function deleteFiles(dir) {
    fs.rmdir(dir, { recursive: true }, err => {
        if (err) console.log(err);
    });
}

exports.config = {
    specs: [
        './specs/**/*.js'
    ],
    exclude: [
        './specs/examples/**/*.js'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            args: [
                '-headless'
            ]
        }
    }],
    logLevel: 'error', // trace | debug | info | warn | error | silent
    bail: 0,
    baseUrl: 'ADRESA TESTOVANE APLIKACE',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'selenium-standalone'
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: (config, capabilities) => {
        deleteFiles("screenshots");
    },
    afterTest: (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`${test.parent}__${test.title}.png`).replace(/ /g, '_');
        if (passed === true) {
            createIfNotExists(passedDirectory);
            browser.saveScreenshot( `${passedDirectory}/failed/${screenshotName}`);
        } else {
            createIfNotExists(failedDirectory);
            browser.saveScreenshot(`${failedDirectory}/failed/${screenshotName}`);
        }
    }
}
