import { Page } from "@playwright/test"
import BasePage from "./BasePage"

/**
 * This class has code for hover over to an element and then select a particular element from
 * there. Also, it has code for selecting desired data from a table.
 */

class HomePage extends BasePage{
    page:Page

    constructor(page:Page){
      super(page)
       this.page=page
      // this.clickByText("//p[text()='Consent']")
    }

  getH2Text(){
      return this.findByCss("h2[class='left_title  large ']>span").allInnerTexts()
    }

     async getTableHeaderText(){
    const fristTableRowsValue:string[]=await this.findByXpath("table th").allInnerTexts()
    const tableRow:string[]= await  this.findByCss("[class='aqua_table']>tbody>tr").allInnerTexts()
    const firstTableRows:string =   tableRow[0]
    const fristTableRowsValues:string[]=firstTableRows.split('\t')
    return fristTableRowsValue
 }

 /**
  * Below code is to fetch data from a table which consists of three rows.
  * 
  */

 async getTableData(headingName:string){
  const rows=this.findByXpath('tbody th')
  const datafields=this.findByXpath('tbody td')
   const dataContnet:string[]=[]
  for(let i=0;i<await rows.count();i++){
    const heading=(await rows.nth(i).allTextContents()).find(x=>x===headingName)
   if(heading==='Mobile'){
      for(let j=1;j<6;j++){ 
        const content =  await datafields.nth(1+(j-1)*3).textContent()
        if(content){
        dataContnet?.push(content)
        }
      }
    }else if(heading==='Web/Desktop'){
        for(let j=1;j<6;j++){
          const content =  await datafields.nth((j-1)*3).textContent()
          if(content){
          dataContnet?.push(content)
          }
      }
    }else if(heading==='Performance'){
        for(let j=1;j<6;j++){
          if(j===1){
            await datafields.nth(2).textContent()
          }
          const content =  await datafields.nth(3*(j-1)+2).textContent()
          if(content){
          dataContnet?.push(content)
          }
      }
    }
    }
 return dataContnet
}

  async getHeading(){
 const h4content:string[]=await this.findByXpath("//i[contains(@class,'fa')]/parent::h4").allInnerTexts()
  return h4content
}

async clickOnNavBar(menu:string){
  this.findByLink("Contact Us")
  console.log(await this.getPageTitle())
}

async clickOnSamplePageTestLink(){
  await this.hoverByLink('#menu-item-2822')
  await this.findByCss("#menu-item-2846>a").click()
}

async hoverAndClick(link:string,subLink:string){
 await this.mutipleHovering("#menu-item-2822","//span[text()='"+link+"']")
 await this.findByText("//span[text()='"+subLink+"']").click()
}

}

export default HomePage
