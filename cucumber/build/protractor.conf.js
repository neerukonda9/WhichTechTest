"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const PORT = process.env.JENKINS_PORT || 4200;
const path = require('path');
let chromeOptions = {
    args: ['--disable-infobars=true', '--window-size=1024,768'],
};
const cucumberReportDirectory = './cucumber/test-results';
const jsonReportFile = cucumberReportDirectory + '/cucumber_report.json';
let nodeModulePath = process.cwd();
if (nodeModulePath.endsWith('cucumber')) {
    nodeModulePath = '../node_modules';
}
else {
    nodeModulePath = 'node_modules';
}
exports.config = {
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
    onComplete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    onPrepare() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.waitForAngularEnabled(false);
            yield protractor_1.browser.manage().window().setSize(1200, 665);
            yield protractor_1.browser.driver.getCapabilities().then(function (caps) {
                protractor_1.browser.browserName = caps.get('browserName');
                protractor_1.browser.platformName = caps.get('platformName');
                protractor_1.browser.defaultImplicitWait = 30000;
            }),
                yield protractor_1.browser
                    .manage()
                    .timeouts()
                    .implicitlyWait(protractor_1.browser.defaultImplicitWait);
            yield protractor_1.browser
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
        });
    },
    onCleanUp() {
        const CucumberHtmlReport = require('cucumber-html-report');
        return CucumberHtmlReport.create({
            source: jsonReportFile,
            dest: cucumberReportDirectory,
            title: 'Which Test- Acceptance Test Run',
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
