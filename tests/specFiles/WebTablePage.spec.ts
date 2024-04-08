import { chromium, expect, test } from '@playwright/test'
import Message from '../Messages'
import HomePage from '../pages/HomePage'
import configValue from '../config'
import WebTablePage from '../pages/WebTablePage'
test.describe('WebTable page related tests',()=>{
    let tabName="AngularJS Protractor Practice Site"
  let subMenu="WebTable"
    let homePage: HomePage
    let webTable: WebTablePage
    let endPoint="/" 
    let message = new Message('tests/messages.properties')

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:configValue.headless
        })
        const context = await browser.newContext()
      page= await  context.newPage()
        homePage =  new HomePage(page)
    await homePage.navigateTo(endPoint) 
    if (!configValue.remote){
        await homePage.findByText("//p[text()='Consent']").click()
      }         
        webTable=new WebTablePage(page)     
    })

    test('Get the header of the Web Table title', async()=>{
        await homePage.hoverAndClick(tabName,subMenu)
        expect((await webTable.getHeaderOfTheWebTable()).slice(0,1)).toContainEqual('firstName') 
    })

    test("When searched by name person's name and email address can be seen", async()=>{
        await homePage.hoverAndClick(tabName,subMenu)
       await webTable.inputFirstName('Pol')
       expect(await webTable.fieldCount('Pol')).toContainEqual('Pol')
       expect(await webTable.getListOfEmails('Pol')).toContainEqual('PolGermain@whatever.com')
    })

    test("when searched by global search person's name and email address can be seen",async()=>{
        await homePage.hoverAndClick(tabName,subMenu)
        await webTable.inputGlobalSearch('jacques')
        expect(await webTable.fieldCount('Jacques')).toContainEqual('Jacques')
       expect(await webTable.getListOfEmails('Jacques')).toContainEqual('Jacquesbjip@whatever.com')
    })      
})