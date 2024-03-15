import { chromium, expect, test } from '@playwright/test'
import Message from '../Messages'
import HomePage from '../pages/HomePage'
test.describe('Home page related tests',()=>{
    let homePage: HomePage
    let endPoint="/" 
    let message = new Message('tests/messages.properties')

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:true
        })
        const context = await browser.newContext()
      page= await  context.newPage()
        homePage =  new HomePage(page)
    await page.waitForTimeout(1000)
        await homePage.navigateTo(endPoint)        
    })
      

    test('All h2 and h4 text can be seen as expected', async()=>{
expect(await homePage.getH2Text()).toEqual(message.getListOfStrings('homePage.h2Text'))
expect((await homePage.getHeading()).slice(1,3)).toEqual(message.getListOfStrings('homePage.h4Text')?.slice(1,3))
    })

    test('Table Header text matches', async()=>{
       //await homePage.hoverAndClick()
     expect((await homePage.getTableHeaderText()).slice(0,3)).toEqual(message.getListOfStrings('homePage.tableRowsContents'))
    })

    test('Data for type of testing matches are as expected', async()=>{
       expect(await homePage.getTableData('Mobile')).toEqual(message.getListOfStrings('homePage.mobileType'))
       expect(await homePage.getTableData('Web/Desktop')).toEqual(message.getListOfStrings('homePage.wedDesktop'))
       expect(await homePage.getTableData('Performance')).toEqual(message.getListOfStrings('homePage.performance'))
     })
})
