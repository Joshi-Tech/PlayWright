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

    /**
     * Below code how to pick up the date
     * There were two types of date picker covered in the below method
     * 1. When Year and Months have seperate drop down
     * 2. When Month+Year in head and you have to move from arrows either side
     * For this website Date pickers are inside iframe
     */

   async getDate(tabName:string, month:string, year:string,date:string){
    if(tabName=='DropDown DatePicker'){
        const frame= this.page.waitForSelector("//iframe[contains(@data-src,'dropdown-month-year.html')]")
        const iframeContents=await (await frame).contentFrame()
      const element=  await iframeContents?.waitForSelector('input#datepicker')
      await element?.click()
      await iframeContents?.selectOption('.ui-datepicker-month',{label:month})
      await iframeContents?.selectOption('.ui-datepicker-year',{label:year})
     const dates= await iframeContents?.waitForSelector("//a[text()='"+date+"']")
     await dates?.click()
   }else if(tabName=='Simple Date Picker'){
        const frame= this.page.waitForSelector("//iframe[contains(@data-src,'default.html')]")
        const iframeContents=await (await frame).contentFrame()
      const element=  await iframeContents?.waitForSelector('input#datepicker')
      await element?.click()
      while(true){
        const months=  await iframeContents?.textContent('.ui-datepicker-month')
        const years = await iframeContents?.textContent('.ui-datepicker-year')
      if(month===months&&year===years){  
        break;
      }
      const monthsAndYears=await iframeContents?.waitForSelector('//a[@title="Next"]')
    await monthsAndYears?.click() 
      }
      const dates= await iframeContents?.waitForSelector("//a[text()='"+date+"']")
      await dates?.click() 
   }
    }
}

export default DatePicker
