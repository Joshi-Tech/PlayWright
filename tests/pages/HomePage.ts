import { Page,Locator } from "@playwright/test"
import { setTimeout } from "timers/promises"
import BasePage from "./BasePage"
class HomePage extends BasePage{
    page:Page

    constructor(page:Page){
      super(page)
       this.page=page
    }

    async typeEmail(email:string){
      await this.inputData("[id='subscribe-email'] input[name='email']", email)
      await this.submit('#subscribe-submit')
    }

    getTitle(){
      return this.findByCss("h1[class='site-title']").allInnerTexts()
    }

     getParagraphText(){
      return this.findByXpath("//h2[text()='Title mismatch']/preceding::p").allTextContents()
 }

 getEntryTitleText(){
  return this.findByCss(".entry-title").allTextContents()
}

getHeading(){
  return this.findByCss('.wp-block-heading')
}
}

export default HomePage
