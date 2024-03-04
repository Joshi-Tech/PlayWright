import { Page,Locator } from "@playwright/test";
import BasePage from "./BasePage";

class AboutPage{
    page:Page;

    constructor(page:Page){
        this.page=page;
    }

    getPageTitle(){
        return this.page.title();
    }

    getFollowByEmailTxt(){
        return this.page.locator("h3>label[for='subscribe-field']").textContent();
    }

    getBlockHeading(){
        return this.page.locator(".wp-block-heading").allTextContents();
    }

    async clickOnLink(link:string){
        await this.page.locator("a[href]").click();
    }

    basePage(){
        return new BasePage(this.page);
    }
    
}

export default AboutPage;