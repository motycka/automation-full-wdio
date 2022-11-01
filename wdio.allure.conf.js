const allure = require('allure-commandline');
const video = require('wdio-video-reporter');
const fs = require('fs');
const allureTmpDirectory = './.tmp/allure';
const allureReportDirectory = './reports/allure';

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
    reporters: [
        'spec',
        [video, {
            outputDir: allureTmpDirectory,
            saveAllVideos: true,        // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],
        ['allure', {
            outputDir: allureTmpDirectory,
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            addConsoleLogs: true,
        }]
    ],
    reporterSyncInterval: 120000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: (config, capabilities) => {
        // remove previous tmp files
        fs.rmdir(allureTmpDirectory, { recursive: true }, err => {
            if (err) console.log(err);
        });
    },
    onComplete: () => {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', '--clean', allureTmpDirectory, '--output', allureReportDirectory]);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);
            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject(reportError);
                console.log('Allure report successfully generated');
                resolve()
            });
        });
    }
}
