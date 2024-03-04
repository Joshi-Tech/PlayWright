import {test, expect, chromium} from '@playwright/test'
import AboutPage from './pages/AboutPage'
import exp from 'constants';

test.describe('About page tests',()=>{
let  followByBlogTxt = 'Follow Blog via Email';
let aboutPage:AboutPage;
let endPoint='/about'

test('Page title can be seen as expected', async ({page})=>{
    const browser = await chromium.launch({
        headless:false
    })
const context = await browser.newContext();
page = await context.newPage();
aboutPage= new AboutPage(page);
await aboutPage.basePage().navigateTo(endPoint);
expect(page).toHaveTitle(await aboutPage.getPageTitle())
console.log(await aboutPage.getFollowByEmailTxt())
})

test('FOLLOW BLOG VIA EMAIL text can be seen', async ({page})=>{
    const browser = await chromium.launch({
        headless:false
    })
const context = await browser.newContext();
page = await context.newPage();
aboutPage= new AboutPage(page);
await aboutPage.basePage().navigateTo(endPoint);
expect(await aboutPage.getFollowByEmailTxt()).toEqual(followByBlogTxt);
})

test('About page has got all block headings', async ({page})=>{
    const blockheading=['About the Blog', 'About Me', 'Consulting', 'Speaking', 'Teaching', 'Guest Articles', 'Publications','Personal Posts']
    const browser = await chromium.launch({
        headless:false
    })
const context = await browser.newContext();
page = await context.newPage();
aboutPage= new AboutPage(page);
await aboutPage.basePage().navigateTo(endPoint);
console.log(await aboutPage.getBlockHeading())
expect(await aboutPage.getBlockHeading()).toStrictEqual(blockheading)
})

test('User able to click on desired link', async ({page})=>{
    const browser = await chromium.launch({
        headless:false
    })
const context = await browser.newContext();
page = await context.newPage();
aboutPage= new AboutPage(page);
await aboutPage.basePage().navigateTo(endPoint);
console.log(await aboutPage.getBlockHeading())
console.log(await page.title());
})

})