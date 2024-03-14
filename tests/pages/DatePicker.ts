import { Page } from "@playwright/test";
import BasePage from "./BasePage";

class DatePicker extends BasePage{
page:Page
    constructor(page:Page){
super(page)
this.page=page
    }

    async clickOnATab(tabName:string){
        await this.page.waitForTimeout(2000)
        await this.clickByText("//li[text()='"+tabName+"']")
        await this.page.waitForTimeout(3000)
    }

    async getTabTextMsg(tab:string){
       return this.findByCss("[rel-title='"+tab+"']>div").textContent()
    }
}

export default DatePicker