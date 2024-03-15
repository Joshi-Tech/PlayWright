import { chromium, expect, test } from '@playwright/test'
import Message from '../Messages'
import HomePage from '../pages/HomePage'
import ToolTipsPage from '../pages/ToolTipsPage'
import FakeData from '../fakeData'

test.describe('Tool Tips page related tests',()=>{
    let homePage: HomePage
    let toolTipPage:ToolTipsPage
    let endPoint="/" 
    let message = new Message('tests/messages.properties')

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:true
        })
        const context = await browser.newContext()
      page= await  context.newPage()
        homePage =  new HomePage(page)
       // homePage.clickByText("//p[text()='Consent']") //This is needed for local use
        await homePage.navigateTo(endPoint)
        toolTipPage= new ToolTipsPage(page)
                
    })
    
    test('User should be able to different tabs',async()=>{
       await homePage.hoverAndClick("Demo Testing Site","Tooltip")
        expect(await toolTipPage.getCloseAttentionMsg('Country')).toEqual('Verify image based tooltip by moving your cursor to Country.')
        await toolTipPage.clickOnATab('Video Based')
        expect(await toolTipPage.getCloseAttentionMsg('video')).toEqual('Verify tooltip on video buttons.')
        await toolTipPage.clickOnATab('Forms Based')
        expect(await toolTipPage.getCloseAttentionMsg('text box')).toEqual('Verify tooltip text by moving cursor to the text box')
    })

    test('User should be able to submit form which inside iframe',async()=>{
      await homePage.hoverAndClick("Demo Testing Site","Tooltip")
        await toolTipPage.clickOnATab('Forms Based')
      await toolTipPage.getToolTipText(FakeData.firstName(),FakeData.lastName(),FakeData.address())
     })

     test('Tool tip text can be seen',async()=>{
      await homePage.hoverAndClick("Demo Testing Site","Tooltip")
        await toolTipPage.clickOnATab('Forms Based')
       expect(await toolTipPage.getToolTipTextOfTheForm()).toEqual('Please provide your firstname.')
     })
})
