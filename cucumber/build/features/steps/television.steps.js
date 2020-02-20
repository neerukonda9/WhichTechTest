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
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Television_1 = require("./pageObjects/Television");
const expect = chai.use(chaiAsPromised).expect;
const cucumberTimeOut = 6 * 10000;
let televisionPage;
const waitFor = protractor_1.protractor.ExpectedConditions;
cucumber_1.Before(() => {
    televisionPage = new Television_1.TelevisionPage();
});
cucumber_1.Given('I navigate to the tvReviewPage', { timeout: cucumberTimeOut }, () => __awaiter(this, void 0, void 0, function* () {
    yield televisionPage.maxWindowSize();
    yield televisionPage.navigateTo();
}));
cucumber_1.When('the page loads', { timeout: cucumberTimeOut }, () => __awaiter(this, void 0, void 0, function* () {
    yield protractor_1.browser.wait(waitFor.presenceOf(televisionPage.logo), 20000, 'failed to find the Which logo');
}));
cucumber_1.Then('I should see allTelevisions link', { timeout: cucumberTimeOut }, () => __awaiter(this, void 0, void 0, function* () {
    yield protractor_1.browser.wait(waitFor.presenceOf(televisionPage.allTelevisionsLink), 10000, 'expected All Televisions link to appear');
    yield televisionPage.allTelevisionsLink.getText().then(function (text) {
        expect(text).to.contain(televisionPage.allTelevisionsLinkText, 'both the texts should mat');
    });
}));
cucumber_1.Then('I see tv and home entertaniment link', { timeout: cucumberTimeOut }, () => __awaiter(this, void 0, void 0, function* () {
}));
cucumber_1.Then('I see the television reviews results', { timeout: cucumberTimeOut }, () => __awaiter(this, void 0, void 0, function* () {
}));
