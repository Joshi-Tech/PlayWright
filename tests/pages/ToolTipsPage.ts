import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import exp from "constants";

class ToolTipsPage extends BasePage{

    page:Page

    constructor(page:Page){
        super(page);
       this.page=page;
    }

    getCloseAttentionMsg(based:string){
       return this.findByText("//div[contains(text(),'"+based+"')]").textContent()
    }

    async getToolTipText(firstName:string, lastName:string,address:string){
        await this.goToFrame(firstName,lastName,address)
    }

    async clickOnATab(tabName:string){
        await this.page.waitForTimeout(2000)
        await this.clickByText("//li[text()='"+tabName+"']")
        await this.page.waitForTimeout(3000)
    }

    /**
     * Below code is to fetch text from a tool tip. 
     * When want to capture text from a tool tip.
     * First, in the developer's tool select source tab.
     * Second, press ctr+\ or F8. Which will freeze the page.
     * Then click on the tool tip to capture the locator for it
     */

    async getToolTipTextOfTheForm(){
        const frame= this.page.waitForSelector("//iframe[contains(@data-src,'forms.html')]")
        const iframeContents=await (await frame).contentFrame()
         await iframeContents?.hover('input#firstname')
       const toolTipText= await iframeContents?.$eval('.ui-tooltip-content', element=>element.textContent)
        return toolTipText
    }
}

export default ToolTipsPage
