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

Then('I see tv and home entertaniment link', { timeout: cucumberTimeOut }, async () => {
    
},
);

Then('I see the television reviews results', { timeout: cucumberTimeOut }, async () => {
    
},
);