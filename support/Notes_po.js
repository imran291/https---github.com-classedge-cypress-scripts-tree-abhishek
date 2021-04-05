import GenericFunctions from "../support/GenericFunctions"
import genericfunctions from "../support/GenericFunctions"

export default class Notes {

    AllNotes = ".item-inner-content div.ql-editor p"
    AllEditButton = ".icon.icon-edit-black"
    AllDelete_TXT = "span.icon.icon-discard"
    Close_BTN = "button.btn.btn-icon.close.close-icon svg"

   SelectFirstElementFrom_AllNotes(){
       const genericFunctions = new GenericFunctions();
       cy.log("genericFunctions.ClickOnSingleElement(this.AllNotes, 0)")
       genericFunctions.ClickOnSingleElement(this.AllNotes, 0)
   }

   SelectFirstElementFrom_AllEditButton(){
    const genericFunctions = new GenericFunctions();
    cy.log("genericFunctions.ClickOnSingleElement(this.AllEditButton, 0)")
    genericFunctions.ClickOnSingleElement(this.AllEditButton, 0)
   }

   AllNotes_GetText(){
    const genericFunctions = new GenericFunctions();
    genericFunctions.GetTextFromElement()
   }

   AllNotes_GetCount(){
    const genericFunctions = new GenericFunctions();
    return (genericFunctions.CountOfAllElements(this.AllNotes))
   }

   AllNotes_IsDetached(){
    const genericFunctions = new GenericFunctions();
    return (genericFunctions.IsVisible(this.AllNotes, 0))
   }

   Close_BTN_Click(){
    const genericFunctions = new GenericFunctions();
    genericFunctions.Click(this.Close_BTN)
   }

   Close_BTN_Click_IsVisible(){
    const genericFunctions = new GenericFunctions();
    return (genericFunctions.IsVisible(this.Close_BTN))
   }
}