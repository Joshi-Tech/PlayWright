import { Page } from "@playwright/test";
import BasePage from "./BasePage";


class DropDownPage extends BasePage{
    page:Page

    constructor(page:Page){
        super(page)
        this.page=page
    }

    getClosableText(){
        return this.findByCss("div[class='information closable']>strong").textContent()
    }


    /**
     * Below code is to click an element from the dropwdown
     */
   async clickCountryName(country:string){
       await this.findByCss("div[rel-title='Select Country']>p>select").click()
       await this.findByCss("div[rel-title='Select Country']>p>select").selectOption(country)
    }
}

export default DropDownPage