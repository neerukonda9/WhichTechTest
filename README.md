# Techtest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Steps to set up and run the test:

Stage One: Initial Setup
1) You will first need to install the following on your work machine. Note: if you are using a MacBook, it is best to do this via Homebrew. I used Mac to develop this test.

Java SDK 8 or above
Node.js
VS Code (the most simplified and lightweight code editor)
Once the above have been setup, you should add the following 'extensions' to VS Code:

Cucumber (Gherkin) Full Support
VSCode Icons
TSLint
You now have a development environment setup locally where you can proceed to the next stage.

Stage Two: Node Setup
You should ideally already have a folder somewhere where you store repositories locally. If not, it is good practice to create a new folder. There's no need to create a sub-directory for your project as this stage, this will be created when you run the command to set up the Angular project. 

Open a terminal or command prompt and CD to the folder location where you want to create your project. You can now install a node package called Angular globally (which is the basis for a Protractor project). 

2) In your terminal, run the following command: 

npm i -g @angular/cli@latest

Now run:

ng new

You will be asked to name your new project - this will create a sub-folder for the project (using this name) within the current directory. 

When asked to specify if you want routing installed, type 'N' (you will not need this unless you intend to use the project to develop a webpage).

You will also be asked to select a style sheet option (css is fine). 

Let the files install. You have now created a bare bones Angular based project, which will include the core files needed to run Protractor tests. 

Stage Three: Project Setup
3) You are now ready to open the project in VS Code. Open the application and select to open the folder your project sits in. Now open a new terminal in VS Code. You now need to use Node to install several packages. Run each of these commands in the terminal to install them:

     npm install protractor

     npm install cucumber

     npm install cucumber-pretty

     npm install protractor-cucumber-framework

     npm install cucumber-html-report

     npm install chai

     npm install chai-as-promised

If you encounter issues installing these, the issue is down to proxy settings (if applicable) in your Node setup. 

4) You should also add a config settings file in VS Code, which will instruct the Cucumber plugin where to find defined step definitions for Cucumber steps. Select the settings gear icon (bottom right), click workspace, click to open the settings file (top right icon) and paste the following into the empty file:

{
    "cucumberautocomplete.steps": [

        "cucumber/features/steps/*.ts"

    ],

    "cucumberautocomplete.syncfeatures": "cucumber/features/*feature",

    "cucumberautocomplete.strictGherkinCompletion": true,

    "files.autoSave": "afterDelay",

 }

The above will also enable step predictions as you type and auto saving of files. It should now be added to the projects auto-generated .gitignore file, which ensures the config is not committed to source control when the time comes to push it to a server. Open the ignore file and paste in (if it is not already done so):

# IDE - VSCode
.vscode/*

You should now be ready to code…

Stage Four: Adding Core Files
5) Delete the “e2e” folder and files as they won’t be needed. You can also delete the src one if you wish. 

6) Create a new folder and name it "cucumber". Inside it add the following folders and sub folders:

 >test-results

  >features

       >steps

           >page-objects



Your folder structure should now resemble this if possible (ignoring the files and folders we have not yet covered):

You will now need to add a config file for protractor along with cucumber feature file, steps file, and page object for storing the webpage elements you intend to interact with.

7) Let’s add a config first. Call it protractor.conf.ts (it will be a .typescript file) and place it in the cucumber folder. The contents of this file should be:

import { Config, browser } from 'protractor';

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

The above file acts as the starting point for any Protractor test. It sets up the reporting mechanism, instructs Protractor where to find the tests / feature files, and assigns other configuration properties which are Selenium specific (implicit waits etc). 

8) We should now create a Feature file in the features folder. Name it reviewTelevision.feature and paste in:

Feature: Review Television
  As a public user, I want to review televisions on the TV review page

Background: I navigate to tvReviewPage

  Given I navigate to the tvReviewPage

@Reviewpage
Scenario: Verify if All Televisions link is shown
  When the page loads
  Then I should see allTelevisions link

@Reviewpage @ignore
Scenario: Verify I land in tv and entertainment page
  When the page loads
  Then I see tv and home entertaniment link

@Reviewpage @ignore
Scenario: Verify if television reviews are dispolayed
  When the page loads
  Then I see the television reviews results

You should notice that the steps are underlined. This is because the Cucumber extension has detected that these steps are currently not defined. We will address this in the next step.

9) In the steps folder, add two files:

television.steps.ts

import { Before, Given, Then, When } from 'cucumber';
import { browser, By, ElementFinder, protractor, element, by } from 'protractor';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { TelevisionPage } from './pageObjects/Television';

const expect = chai.use(chaiAsPromised).expect;
const cucumberTimeOut = 6 * 10000;
let televisionPage: TelevisionPage
const waitFor = protractor.ExpectedConditions;


Before(() => {
    televisionPage = new TelevisionPage();
});

Given('I navigate to the tvReviewPage', { timeout: cucumberTimeOut }, async () => {
    await televisionPage.maxWindowSize();
    await televisionPage.navigateTo();
});

When('the page loads', { timeout: cucumberTimeOut }, async () => {
            await browser.wait(
                waitFor.presenceOf(televisionPage.logo),
            20000,
            'failed to find the Which logo',
        );
});

Then('I should see allTelevisions link', { timeout: cucumberTimeOut }, async () => {
    await browser.wait(
        waitFor.presenceOf(televisionPage.allTelevisionsLink),
        10000,
        'expected All Televisions link to appear',
    );
    await televisionPage.allTelevisionsLink.getText().then(function (text) {
        expect(text).to.contain(televisionPage.allTelevisionsLinkText, 'both the texts should mat');
    
    });
});

Then('I see tv and home entertaniment link', { timeout: cucumberTimeOut }, async () => {},);

Then('I see the television reviews results', { timeout: cucumberTimeOut }, async () => },);

10) We now need to add a Page Object file, which will store the elements our steps above interact with. In the page-object folder, add Television.po.ts and paste in:

import { browser, by, element, } from 'protractor';

export class TelevisionPage  {
    
    logo = element(by.id('gn_which-logo'));
    allTelevisionsLink = element(by.xpath('//a[contains(text(), "All Televisions")]'));
    allTelevisionsLinkText = 'All Televisions';

    async navigateTo(): Promise<any> {
        await browser.get(browser.baseUrl);
    }
    async maxWindowSize() {
        await browser.driver.manage().window().maximize();
    }
}

You may notice that now we have steps files along with a page object in place, all the files sync up. For example, the feature scenario steps are now defined by the steps files and the steps file step definitions include code which lives in the page object.


Stage Six: Running The Tests!


12) We are now close to being able to run the tests! There is one stage missing. We need to add scripts to the package.json file which will instruct protractor to run our config file (which will in turn run the feature file we have added). 



In the scripts section of the package.json file, add the following scripts:


"webdriver-proxy": "webdriver-manager update --versions.chrome=79.0.3945.1308 --gecko true --ignore_ssl",

"bdd": "rimraf cucumber/build && tsc -p cucumber && protractor cucumber/build/protractor.conf.js"
  
The first of these will download WebDrivers (Chrome, Firefox) .

Run it now by typing in the terminal:

npm run webdriver

The second is the command to run the tests. It firstly 'transpiles' the typescript into javascript and places each converted file in a build folder at runtime. It then tells protractor to run our config file, which will be situated in the build folder. 

As a final step, you will need to add a tsconfig.json file to the cucumber folder for the transpiling to work. Add the following to the contents of this file:

{
  "compilerOptions": {
    "resolveJsonModule": true,
    "baseUrl": "./",
    "outDir": "build/",
    "module": "commonjs",
    "target": "es6",
    "types": ["jasmine", "jasminewd2", "node"],
  },
  "include": ["./**/*"]
}

Run the test now by running in terminal npm run bdd

Results will appear in the test-result folder within an index.html file you can open in Chrome. It should then pass. 

You have completed the setup :)
