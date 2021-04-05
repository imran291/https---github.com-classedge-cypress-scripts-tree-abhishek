/// <reference types="cypress" />

import GenericFunctions from "../support/GenericFunctions"

export default class Assignment_BookShelf{

    Steps_WE = ".heading3.primary.d-none.d-lg-block"
    OralTestHeader_TXT = "h2.heading1.text-truncate"
    SelectBook_TXT = "h2.heading2"

    Steps_WE_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.Steps_WE))
    }

    
    OralTestHeader_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.OralTestHeader_TXT).then((oralText) => {
            if(oralText.includes("Oral Test")){
                return true
            }else{
                return false
            }
        }))
    }

    SelectBook_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.SelectBook_TXT))
    }
   
}