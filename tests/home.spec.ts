import {test, expect, chromium} from '@playwright/test'
import HomePage from './pages/HomePage'
import FakeData from './fakeData'
import Message from './Messages'
import { url } from 'inspector'
test.describe('Home page related tests',()=>{
    let homePage: HomePage
    let endPoint="/" 
    let message = new Message('tests\\messages.properties')

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:false
        })
        const context = await browser.newContext()
      page= await  context.newPage()
        homePage =  new HomePage(page)
    await page.waitForTimeout(1000)
        await homePage.navigateTo(endPoint)        
    })
      

    test('Open Home Page and verify entry title', async({page})=>{
        expect((await homePage.getEntryTitleText()).at(0)).toContain('Software Engineering Seniority')
        expect(await homePage.getHeading().nth(1).textContent()).toEqual('Population at each level') 
    })

    test('Type email id', async({page})=>{
       await homePage.typeEmail(FakeData.getEmailId())
 expect(await homePage.getTitle()).toContainEqual('AUTOMATION PANDA')
    })

    test('Text of various Paragaraph matches in the Home Page', async({page})=>{
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage('homePage.salaryRanges'))
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage('homePage.seniorityText'))
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage("homePage.staffLevel"))
     })
})
