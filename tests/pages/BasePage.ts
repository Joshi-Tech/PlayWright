import { Page,Locator } from "@playwright/test";
class BasePage{
page:Page;

constructor(page: Page){
    this.page=page;
}

async navigateTo(url:string){
await this.page.goto(url);
}

asyncfindByLink(link:string){
    this.page.getByText(link).click
}

}

export default BasePage;