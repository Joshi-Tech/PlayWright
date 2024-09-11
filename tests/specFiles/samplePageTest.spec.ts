import { chromium, expect, test } from '@playwright/test'
import HomePage from "../pages/HomePage"
import SamplePageTest from "../pages/SamplePageTest"
import FakeData from '../fakeData'
import configValue from '../config'

test.describe('Sample Page related tests',()=>{
  const tabName="testers-hub"
  const subMenu="samplepagetest"
    let samplePageTest: SamplePageTest
    let homePage:HomePage
    const endPoint="/" 
    //let message = new Message('tests/messages.properties')

    test.beforeEach(async ({page}) => {
        const browser = await chromium.launch({
            headless:configValue.headless
        })
        const context = await browser.newContext()
      page= await context.newPage()
      homePage = new HomePage(page)
        await homePage.navigateTo(endPoint) 
        if(!configValue.remote){
      await homePage.findByText("//p[text()='Consent']").click() 
      }
        samplePageTest =  new SamplePageTest(page) 
    })
      

    test('When user clicks on a nav link should be on correct page', async()=>{
 await homePage.clickOnTab(tabName,subMenu)
expect(await samplePageTest.getPageHeaing()).toEqual('Sample Page Test')
    })

    test('User see the current month as a calendar caption',async()=>{
      await  homePage.clickOnTab(tabName,subMenu)
        await samplePageTest.checkUserDetailsLabel()
    })

    test('User should be able to submit their details',async()=>{
      await  homePage.clickOnTab(tabName,subMenu)
       await samplePageTest.inputUserDetails(FakeData.getFullName(),FakeData.getEmailId(), FakeData.getWebsite(),'3-5','Automation Testing','Graduate')
       await samplePageTest.typeComments("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
    await samplePageTest.clickSubmitBtn()
    expect(await samplePageTest.contFormIdH3()).toEqual('Message Sent (go back)')
    }) 
})