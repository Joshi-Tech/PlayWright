import { Page,Locator, Browser } from "@playwright/test";
import {test, expect, chromium} from '@playwright/test'
class BasePage{
page:Page;

constructor(page:Page){
   this.page=page;
}

async navigateTo(url:string){
await this.page.goto(url);
}

async findByLink(link:string){
  await  this.page.getByText(link).click()
}

findByCss(css:string){
  return this.page.locator(css)
}

findById(id:string){
return this.page.locator(id)
}

findByText(text:string){
  return this.page.locator(text)
}

async inputData(locator:string, text:string){
  await this.page.locator(locator).clear()
  await this.page.locator(locator).fill(text)
}

async submit(locator:string){
  await this.page.locator(locator).click()
}

}

export default BasePage;