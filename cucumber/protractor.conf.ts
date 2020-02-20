import { Config, browser } from 'protractor';
// import { CommonSettings } from './commonSettings';

const PORT = process.env.JENKINS_PORT || 4200;
const path = require('path');
// const commonSettings = new CommonSettings();

let chromeOptions = {
    args: ['--disable-infobars=true', '--window-size=1024,768'],
};

if (process.env.JENKINS_PORT) {
    chromeOptions = {
        args: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-infobars=true'],
    };
}

const cucumberReportDirectory = './cucumber/test-results';
const jsonReportFile = cucumberReportDirectory + '/cucumber_report.json';
let nodeModulePath = process.cwd();
if (nodeModulePath.endsWith('cucumber')) {
    nodeModulePath = '../node_modules';
} else {
    nodeModulePath = 'node_modules';
}
export const config: Config = {
    allScriptsTimeout: 50000,
    specs: ['../features/**/*.feature'],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        chromeOptions,
        acceptInsecureCerts: true,
        loggingPrefs: { browser: 'ALL' },
    },
    directConnect: true,
    baseUrl: 'https://www.which.co.uk/reviews/televisions',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
    },
    // plugins: [commonSettings.commonVisualSettings()],
    async onComplete() {
    },
    async onPrepare() {
        await browser.waitForAngularEnabled(false);
        await browser.manage().window().setSize(1200, 665);
        await browser.driver.getCapabilities().then(function (caps) {
            browser.browserName = caps.get('browserName');
            browser.platformName = caps.get('platformName');
            browser.defaultImplicitWait = 30000;
        }),
            await browser
                .manage()
                .timeouts()
                .implicitlyWait(browser.defaultImplicitWait);
        await browser
            .manage()
            .timeouts()
            .pageLoadTimeout(30000);
        require('ts-node').register({
            project: require('path').join(__dirname, '../tsconfig.json'),
        });

        const chai = require('chai');
        const chaiAsPromised = require('chai-as-promised');

        // Load chai-as-promised support
        chai.use(chaiAsPromised);

        // Initialise should API (attaches as a property on Object)
        chai.should();
    },
    onCleanUp() {
        const CucumberHtmlReport = require('cucumber-html-report');
        return CucumberHtmlReport.create({
            source: jsonReportFile,
            dest: cucumberReportDirectory,
            title: 'My Project - Acceptance Test Run',
            component: new Date().toString(),
        })
            .then(console.log)
            .catch(console.log);
    },
    cucumberOpts: {
        format: [nodeModulePath + '/cucumber-pretty', 'json:' + jsonReportFile],
        tags: 'not (@ignore)',
        require: [
            path.resolve(process.cwd(), './**/*.steps.js'),
            path.resolve(process.cwd(), './**/common.hooks.js'),
        ],
    },
};