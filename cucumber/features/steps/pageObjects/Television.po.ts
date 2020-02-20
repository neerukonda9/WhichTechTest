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