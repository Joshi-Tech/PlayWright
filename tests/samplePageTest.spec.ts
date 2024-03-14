import { chromium, expect, test } from '@playwright/test'
import Message from "./Messages"
import HomePage from "./pages/HomePage"
import SamplePageTest from "./pages/SamplePageTest"
import FakeData from './fakeData'

test.describe('Home page related tests',()=>{
    let samplePageTest: SamplePageTest
    let homePage:HomePage
    let endPoint="/" 
    let message = new Message('tests/messages.properties')

    test.beforeEach(async ({page}) => {
        const browser = await chromium.launch({
            headless:false
        })
        const context = await browser.newContext()
      page= await context.newPage()
       samplePageTest =  new SamplePageTest(page)
      homePage = new HomePage(page)
    await page.waitForTimeout(1000)
        await homePage.navigateTo(endPoint) 
        await homePage.findByText("//p[text()='Consent']").click()      
    })
      

    test('When user clicks on a nav link should be on correct page', async()=>{
 homePage.clickOnSamplePageTestLink()
expect(await samplePageTest.getPageHeaing()).toEqual('Sample Page Test')
    })

    test('User see the current month as a calendar caption',async()=>{
      await  homePage.clickOnSamplePageTestLink()
        console.log(await samplePageTest.getMonthCaption())
        await samplePageTest.checkUserDetailsLabel()
    })

    test('User should be able to submit their details',async()=>{
      await  homePage.clickOnSamplePageTestLink()
       await samplePageTest.inputUserDetails(FakeData.getFullName(),FakeData.getEmailId(), FakeData.getWebsite(),'3-5','Automation Testing','Graduate')
       await samplePageTest.typeComments("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
    await samplePageTest.clickSubmitBtn()
    expect(await samplePageTest.contFormIdH3()).toEqual('Message Sent (go back)')
    })

  //   test('When user clicks a nav link should be on correct page', async()=>{
  //     //await  homePage.clickOnSamplePageTestLink()
    
  //     await homePage.clickOnNavLink()
  // })
    
})





