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
class TelevisionPage {
    constructor() {
        this.logo = protractor_1.element(protractor_1.by.id('gn_which-logo'));
        this.allTelevisionsLink = protractor_1.element(protractor_1.by.xpath('//a[contains(text(), "All Televisions")]'));
        this.allTelevisionsLinkText = 'All Televisions';
    }
    navigateTo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get(protractor_1.browser.baseUrl);
        });
    }
    maxWindowSize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.driver.manage().window().maximize();
        });
    }
}
exports.TelevisionPage = TelevisionPage;
