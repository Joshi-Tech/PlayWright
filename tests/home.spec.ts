import {test, expect, chromium} from '@playwright/test'
import HomePage from './pages/HomePage'
import FakeData from './fakeData';
import Message from './Messages';
test.describe('Home page related tests',()=>{
    let homePage: HomePage;
    let endPoint='' 
    let message = new Message('tests\\messages.properties')

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:false
        })
        const context = await browser.newContext();
         page = await context.newPage()
        homePage = new HomePage(page)
        await homePage.basePage().navigateTo(endPoint)        
    });
      

    test('Open Home Page and verify entry title', async({page})=>{
        console.log((await homePage.basePage().findByCss('.wp-block-heading').allTextContents()).at(1))
        expect((await homePage.getEntryTitleText()).at(0)).toContain('Software Engineering Seniority')
        expect(await homePage.basePage().findByCss('.wp-block-heading').nth(1).textContent()).toEqual('Population at each level') 
    })

    test('Type email id', async({page})=>{
       await homePage.basePage().inputData("[id='subscribe-email'] input[name='email']", FakeData.getEmailId())
     await homePage.basePage().submit('#subscribe-submit')
 expect(await homePage.getTitle()).toContainEqual('AUTOMATION PANDA')
    })

    test('Text of various Paragaraph matches in the Home Page', async({page})=>{
        await homePage.basePage().inputData("[id='subscribe-email'] input[name='email']", FakeData.getEmailId())
        await homePage.basePage().submit('#subscribe-submit')
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage('homePage.salaryRanges'))
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage('homePage.seniorityText'))
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage("homePage.staffLevel"))
     })
})
