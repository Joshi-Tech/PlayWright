import {test, expect, chromium} from '@playwright/test'
import HomePage from './pages/HomePage'
import FakeData from './fakeData';
import Message from './Messages';
test.describe('Home page related tests',()=>{
    let homePage: HomePage;
    let endPoint=''

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:false
        })
        const context = await browser.newContext();
         page = await context.newPage();
        homePage = new HomePage(page);
        await homePage.basePage().navigateTo(endPoint)
        
    });
    
    

    test('Open Home Page and verify entry title', async({page})=>{
        console.log(await homePage.getEntryTitleText())
        console.log('FIRST TITLE= '+(await homePage.getEntryTitleText()).slice(0));
      // expect( await homePage.entryTitle.nth(0).textContent())
       // .toStrictEqual("Software Engineering Seniority Levels");
        
    })

    test('Type email id', async({page})=>{
       const message = new Message('tests\\messages.properties')
      await homePage.typeEmail(FakeData.getEmailId());
     await homePage.clickSubmitBtn();
     console.log(message.getMessage('homePage.salaryRanges'))
 expect(await homePage.getTitle()).toContainEqual('AUTOMATION PANDA')
    })

    test('Text of various Paragaraph matches in the Home Page', async({page})=>{
        const message = new Message('tests\\messages.properties')
       await homePage.typeEmail(FakeData.getEmailId());
      await homePage.clickSubmitBtn();
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage('homePage.salaryRanges'))
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage('homePage.seniorityText'))
      expect(await homePage.getParagraphText()).toContainEqual(message.getMessage("homePage.staffLevel"))
     })

})
