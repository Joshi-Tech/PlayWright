import { Page,Locator } from "@playwright/test";
import { setTimeout } from "timers/promises";
import BasePage from "./BasePage";
class HomePage{
    page:Page;

    constructor(page:Page){
        this.page=page;
    }

    async navigate(){
      await  this.page.goto('https://automationpanda.com/');
    }

    async typeEmail(email:string){
      await  this.page.locator("[id='subscribe-email'] input[name='email']").fill(email);
    }

    getTitle(){
      return  this.page.locator("h1[class='site-title']").allInnerTexts();
    }

     getParagraphText(){
     return this.page.locator("//h2[text()='Title mismatch']/preceding::p").allTextContents()
 }

 getEntryTitleText(){
  return this.page.locator(".entry-title").allTextContents()
}

    basePage(){
      return new BasePage(this.page);
  }
}

export default HomePage;