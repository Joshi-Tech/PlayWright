import { chromium, expect, test } from '@playwright/test'
import Message from '../Messages'
import DatePicker from '../pages/DatePicker'
import HomePage from '../pages/HomePage'

test.describe('Date Pickers Page related tests',()=>{
    let homePage: HomePage
    let datePicker:DatePicker
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
        datePicker= new DatePicker(page)
                
    })
    
    test('User should be able to submit form which inside iframe',async()=>{
        await homePage.hoverAndClick("Demo Testing Site","DatePicker")
        await datePicker.clickOnATab('DropDown DatePicker')
      expect(await datePicker.getTabTextMsg('DropDown DatePicker')).toEqual('Pick a date by clicking on the text box.')
     })

     test('Select date from a date picker where you have seperate dropwdown for month and year',async()=>{
      await homePage.hoverAndClick("Demo Testing Site","DatePicker")
      await datePicker.clickOnATab('DropDown DatePicker')
      await datePicker.getDate('DropDown DatePicker','Apr','2027','20')
   })

   test('Select a date from Simple calendar',async()=>{
    await homePage.hoverAndClick("Demo Testing Site","DatePicker")
    await datePicker.clickOnATab('Simple Date Picker')
    await datePicker.getDate('Simple Date Picker','April','2025','20')
 })
})

