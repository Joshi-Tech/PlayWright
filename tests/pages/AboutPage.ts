import { Page,Locator } from "@playwright/test";
import BasePage from "./BasePage";

class AboutPage extends BasePage{
    page:Page;

    constructor(page:Page){
        super(page)
        this.page=page;
    }

    getPageTitle(){
        return this.page.title();
    }

    getFollowByEmailTxt(){
        return this.findByCss("h3>label[for='subscribe-field']").textContent()
    }

    getBlockHeading(){
        return this.findByCss(".wp-block-heading").allTextContents()
    }

    async clickOnLink(link:string){
        await this.findByCss("a[href]").click();
    }
}

export default AboutPage;