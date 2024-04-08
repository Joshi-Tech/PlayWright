import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";
import { count } from "console";

class WebTable extends BasePage{

    page:Page

    constructor(page:Page){
        super(page)
        this.page=page
    }

   async getHeaderOfTheWebTable():Promise<string[]>{
    await this.page.waitForTimeout(4000);
    const headers:string[] = await this.findByCss("th[lr-drag-src='headers']").allTextContents()
return headers
    }

    async inputFirstName(firstName:string){
await this.findByCss("[st-search='firstName']").fill(firstName)
    }

    async inputGlobalSearch(globalSearch:string){
        await this.findByCss("[placeholder='global search']").fill(globalSearch)
    }

    async fieldCount(name:string){
       const fieldsValue:string[]= await this.findByText("//td[text()='"+name+"']").allTextContents()
       return  fieldsValue
    }

    /**
     * Below method illustrates how to filter data. In this example data first filtered with name
     * and then filtered only emails
     * 
     */

    async getListOfEmails(name:string){
        let emailList:string[]=[]
      const webTableContents:string[]=  await this.findByXpath('tbody tr td').allTextContents()
      const webTableContentsFilterByName:string[]=webTableContents.filter(x=>x.includes(name))
      emailList=webTableContentsFilterByName.filter(x=>x.includes('@'))
      return emailList
    }
}

export default WebTable