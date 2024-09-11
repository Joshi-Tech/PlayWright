import { chromium, expect, test } from '@playwright/test'
import HomePage from "../pages/HomePage"
import DropDownPage from "../pages/DropDownPage"
import configValue from '../config'

test.describe('Drop Down page related tests',()=>{
    let homePage:HomePage
    let drowpdownPage:DropDownPage
    const endPoint="/" 

    test.beforeEach(async ({page}) => {
        const browser = await chromium.launch({
            headless:configValue.headless
        })
        const context = await browser.newContext()
      page= await context.newPage()
      homePage = new HomePage(page)
    await page.waitForTimeout(1000)
        await homePage.navigateTo(endPoint) 
        if(!configValue.remote){
        await homePage.findByText("//p[text()='Consent']").click() 
        }
        drowpdownPage=new DropDownPage(page)
    })

    test('dropdown text message select',async ()=>{
        await homePage.hoverAndClick("Demo Testing Site","DropDown Menu")
        expect(await drowpdownPage.getClosableText()).toEqual('Select country from below drop down list:')
    })

    test('Able to select correct country from drop down',async()=>{
        await homePage.hoverAndClick("Demo Testing Site","DropDown Menu")
       await drowpdownPage.clickCountryName('Japan')
    })
})