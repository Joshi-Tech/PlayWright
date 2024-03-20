import { Page, expect} from "@playwright/test"
import BasePage from "./BasePage"

/**
 * This class has code for selecting element dynamically in drop-down, raio button and checkbox 
 */

class SamplePageTest extends BasePage{
page: Page

    constructor(page:Page){
        super(page)
this.page=page
    }

getPageHeaing(){
    return this.findByCss('.page_heading>h1').textContent()    
}

getMonthCaption(){
    return this.findByCss('table>caption').textContent()
}

async checkUserDetailsLabel(){
 expect(await this.findByCss("label[class*='name']").textContent()).toEqual('Name(required)')
 expect(await this.findByCss("label[class*='email']").textContent()).toEqual('Email(required)')
 expect(await this.findByCss("label[class*='url']").textContent()).toEqual('Website')
}

async inputUserDetails(name:string, email:string, Website:string,_experience:string ,checkbox:string, education:string){
await this.findByCss("input[id*='name']").fill(name)
await this.findByCss("input[id*='email']").fill(email)
await this.findByCss("input[id*='website']").fill(Website)
/**
 * Below method is for select drowpdown, when element has select tag
 */

await this.findByCss("[id*='experienceinyears']").selectOption({label:_experience})

/**
 * Below method How to select a checkbox dynamically
 */
await this.findByCss("[value='"+checkbox+"']").check()

/**
 * Below method is how to select a radio button dynamically
 */
await this.findByXpath("//label[text()=' "+education+"']").check()
}

async clickAlertButton(){
  await this.findByXpath("//button[contains(text(),'Alert Box')]").click()
 await this.clickOnAlert()
}

async typeComments(comments:string){
  await  this.findByCss("textarea[id*='contact-form']").fill(comments)
}

contFormIdH3(){
 return this.findByCss("div[id*='contact-form']>h3").textContent()
}

}

export default SamplePageTest
