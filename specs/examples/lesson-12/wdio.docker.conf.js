const wdio = require('./wdio.cucumber.conf').config;

wdio.runner = 'local'
wdio.hostname = 'localhost'
wdio.port = 4444
wdio.restart = true
wdio.path = '/wd/hub'

wdio.services = [
    ['selenium-standalone', {
        logPath: `.tmp/selenium-logs`,
        seleniumArgs: {
            seleniumArgs: ["-port", "4444"],
        }
    }],
    // 'docker'
];

wdio.dockerOptions = {
    image: 'selenium/standalone-chrome-debug',
    healthCheck: {
        url: 'http://localhost:4444',
        maxRetries: 3,
        inspectInterval: 5000,
        startDelay: 30000
    },
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
};

exports.config = wdio;
