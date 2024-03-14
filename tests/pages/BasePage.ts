import { Page, expect } from "@playwright/test"
class BasePage{
 page:Page

constructor(page:Page){
 this.page=page
 page.waitForTimeout(2000)
 if(page.url()==='https://www.globalsqa.com/'){
 this.clickByText("//p[text()='Consent']")
}
}

 async navigateTo(url:string){
await this.page.goto(url)
}

async findByLink(link:string){
  await  this.page.getByText(link).click()
}

async hoverByLink(linkText:string){
 await this.page.locator(linkText).hover()
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

findByXpath(xpath:string){
  return this.page.locator(xpath)
}

async inputData(locator:string, text:string){
  await this.page.locator(locator).clear()
  await this.page.locator(locator).fill(text)
}

async submit(locator:string){
  await this.page.locator(locator).click()
}

async getPageTitle(){
  await this.page.title();
}

async clickByText(text:string){
  await this.page.locator(text).click()
}

async clickOnAlert(){
  this.page.on('dialog',dialog=>{
    console.log('****'+dialog.message())
    
})
}

async clickOnNavLink(){
  const link = await this.page.$('a:has-text("CONTACT US")');
   link?.click()
}

async clickSubmitBtn(){
 await this.page.getByRole('button',{name:'Submit'}).click()
}

async mutipleHovering(linkText:string,secondLinkText:string){
  await this.page.locator(linkText).hover()
  await this.page.locator(secondLinkText).hover()
}

async setTimeOUt(){
await this.page.waitForTimeout(5000);
}

/**
 * Below code is how to handle iframe
 */

async goToFormBaseIframe(firstName:string, lastName:string,address:string){
  //wait for the iframe to be present. Provide actual locator of the iframe i.e. one in the iframe tag
 const frame= this.page.waitForSelector("//iframe[contains(@data-src,'forms.html')]")
 //Swith to the context of the iframe
 const iframeContents=await (await frame).contentFrame()
 //Now here on we can interact with  elements inside iframe's
 await iframeContents?.fill('input#firstname',firstName)
 await iframeContents?.fill('input#lastname',lastName)
 await iframeContents?.fill('input#address',address)
}
}



export default BasePage
