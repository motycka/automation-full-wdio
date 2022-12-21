exports.config = {
    specs: [
        './features/**/*.feature',
    ],
    exclude: [],
    suites: {
        login: [
            './features/features/login.feature'
        ],
        applications: [
            './features/features/applications.feature'
        ],
        smoke: [
            './features/features/login.feature',
            './features/features/applications.feature'
        ]
    },
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
    logLevel: 'silent', // trace | debug | info | warn | error | silent
    bail: 0,
    baseUrl: 'ADRESA TESTOVANE APLIKACE',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'selenium-standalone'
    ],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: [
            './steps/**/*.js'
        ],
        requireModule: [
            [
                '@babel/register',
                {
                    rootMode: 'upward',
                    ignore: ['node_modules']
                }
            ]
        ]
    }
}
