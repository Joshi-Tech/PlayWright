import { chromium, expect, test } from '@playwright/test'
import Message from './Messages'
import HomePage from './pages/HomePage'
import ToolTipsPage from './pages/ToolTipsPage'
import exp from 'constants'
import FakeData from './fakeData'
import DatePicker from './pages/DatePicker'

test.describe('Home page related tests',()=>{
    let homePage: HomePage
    let datePicker:DatePicker
    let endPoint="/" 
    let message = new Message('tests/messages.properties')

    test.beforeEach(async ({ page }) => {
        const browser = await chromium.launch({
            headless:false
        })
        const context = await browser.newContext()
      page= await  context.newPage()
        homePage =  new HomePage(page)
        await homePage.navigateTo(endPoint)
        datePicker= new DatePicker(page)
                
    })
    
    test('User should be able to submit form which inside iframe',async()=>{
        await homePage.hoverAndClick("Demo Testing Site","DatePicker")
        await datePicker.clickOnATab('DropDown DatePicker')
      expect(await datePicker.getTabTextMsg('DropDown DatePicker')).toEqual('Pick a date by clicking on the text box.')
     })
})