import GenericFunctions from "../support/GenericFunctions"
import Revision from "../support/Revision_po"

export default class CreateNote{

    Editor_TXT = "div.ql-editor.ql-blank"
    SaveNote_BTN = "button.btn.btn-lg.btn-outline-primary"
    Close_BTN = "#Oval"
    Discard_Yes_BTN = ".mb-10 .btn"
    ChatacterExceedMessage_TXT = "div.invalid-entry"


    ChatacterExceedMessage_TXT_GetText(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromElement(this.ChatacterExceedMessage_TXT))
    }

    Editor_TXT_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Click(this.Editor_TXT)
    }

    SaveNote_BTN_IsDisabled(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsDisabled(this.SaveNote_BTN))
    }

    Discard_Yes_BTN_IsVisible(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(2000)
        return (genericFunctions.IsVisible(this.Discard_Yes_BTN))
    }

    Close_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.Close_BTN)
    }

    Editor_TXT_Clear(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Clear(this.Editor_TXT)
    }

    Editor_TXT_Type(value){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Type(this.Editor_TXT, value)
    }

    SaveNote_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Click(this.SaveNote_BTN)
    }

    CreateBulkNotes(){
        let value = 0;
        const self = this;
        const revision = new Revision();
        cy.fixture("CreateNotes.json").then((note) => {
            this.notes = note;
            this.notes.NewNotes.forEach((Str) => {
                if(value == 0){
                    self.Editor_TXT_Type(Str)
                    self.SaveNote_BTN_Click();
                    // revision.DoNotShowMeAgain_TXT_Click()// check for this element
                    value++;
                }else{
                    revision.CreateNote_BTN_Click();
                    self.Editor_TXT_Type(Str)
                    self.SaveNote_BTN_Click();
                }
            })
        })
    }

    CreateNoteMoreThen3000Characters(){
        const revision = new Revision();
        revision.CreateNote_BTN_Click()
        cy.fixture("CreateNotes.json").then((note) => {
            this.note = note;
            this.Editor_TXT_Type(this.note.MaxCharacters)
            // this.SaveNote_BTN_Click();
        })
    }

}