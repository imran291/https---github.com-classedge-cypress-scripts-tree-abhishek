import GenericFunctions from "../support/GenericFunctions"
import Revision from "../support/Revision_po"
import CreateNote from "../support/CreateNote_po"
import Notes from "../support/Notes_po"
import EditNote from "../support/EditNote_po"
import Chapters from "../support/Chapters_po"
import IntroWithTQ from "../support/Revision_IntroWithTQ_po"
import GetApiFunctions from "../support/GetApiFunctions"
import ApiConfig from "../support/ApiConfig"

export default class HamburgerMenu{

    value = 0
    NavigationIcon_BTN = "span.icon.icon-hamburger-menu"
    Notes_BTN = "button.btn.btn-lg.btn-block.addnote-btn"
    NotesCount_WE = "span.badge.badge-primary"
    Close_BTN = "span.icon.icon-close"
    NoNotes_TXT = " No Notes " 
    HandleNotesAndNoNotes = "button.btn.btn-lg.btn-block.addnote-btn.d-flex.rounded-0"
    LockedElement_WE = "div.points-nav li.item.locked"
    ConformForDeleteNote_TXT = " Delete note "

    HandleNotesAndNoNotes_Text(){
        const self = this
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(2000)
        return (genericFunctions.GetTextFromElement(this.HandleNotesAndNoNotes).then((text) => {
            if(text === self.NoNotes_TXT){
                return true;
            }else{
                return false
            }
        }))
    }

    ConformForDeleteNote_TXT_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickOnElementUsingText(this.ConformForDeleteNote_TXT)
    }

    NavigationIcon_BTN_ClickWithoutCheck(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.NavigationIcon_BTN)
    }

    NavigationIcon_BTN_Click(){
        const self = this
        const genericFunctions = new GenericFunctions();
        const revision = new Revision()
        revision.CreateNote_BTN_IsVisible().then((visibility) => {
            if(visibility == true){
                genericFunctions.ClickForecefully(self.NavigationIcon_BTN);
            }
        })
    }

    NotesCount_WE_GetCount(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(3000)
        return (genericFunctions.GetTextFromElement(this.NotesCount_WE))
    }

    Notes_BTN_IsVisible(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsVisible(this.Notes_BTN))
    }

    Notes_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Click(this.Notes_BTN)
    }

    Close_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Click(this.Close_BTN)
    }    

    DeletePreWrittenNotes(){
        const self = this
        const notes = new Notes()
        const genericFunctions = new GenericFunctions();
        this.HandleNotesAndNoNotes_Text().then((NoNotesTxt) => {
            if(!NoNotesTxt == true){
                self.Notes_BTN_Click();
                cy.wait(3000)
                notes.AllNotes_GetCount().then((totalCount) => {
                    for(let i=0; i<=(totalCount-1); i++){
                        genericFunctions.ClickOnSingleElement(notes.AllNotes, 0)
                        genericFunctions.wait(1000)
                        genericFunctions.ElementScrollIntoView(notes.AllDelete_TXT, 0, 1)
                        genericFunctions.ClickOnSingleElement(notes.AllDelete_TXT, 0)
                        this.ConformForDeleteNote_TXT_Click()
                    }
                })
                // notes.Close_BTN_Click()      
            }else{
                self.Close_BTN_Click()
            }
        })
    }

    DeleteNotes(){
        const revision = new Revision();
        const createNote = new CreateNote();
        const genericFunctions = new GenericFunctions();
        this.NavigationIcon_BTN_Click();
        return (this.HandleNotesAndNoNotes_Text().then((NoNotestext) => {
            if(!NoNotestext == true){
                this.DeletePreWrittenNotes();
                this.NavigationIcon_BTN_Click();
                genericFunctions.wait(3000)
                return (this.HandleNotesAndNoNotes_Text())
            }else{
                this.Close_BTN_Click();
                revision.CreateNote_BTN_Click();
                createNote.CreateBulkNotes()
                this.NavigationIcon_BTN_Click();
                this.DeletePreWrittenNotes();
                this.NavigationIcon_BTN_Click();
                genericFunctions.wait(3000)
                return (this.HandleNotesAndNoNotes_Text())
            }
        }))
    }

    CountOfCueWithTheNotesCreated(){
        const revision = new Revision();
        const createNote = new CreateNote();
        const getApiFunctions = new GetApiFunctions()
        const genericFunctions = new GenericFunctions();
        const self = this
        return (this.HandleNotesAndNoNotes_Text().then((NoNotestext) => {
            if(!NoNotestext == true){
                this.DeletePreWrittenNotes();
                this.NavigationIcon_BTN_Click();
                self.CountOfCueWithTheNotesCreated()
            }else{
                this.Close_BTN_Click();
                revision.CreateNote_BTN_Click();
                createNote.CreateBulkNotes()
                this.NavigationIcon_BTN_Click();
                return (genericFunctions.GetTextFromElement(this.HandleNotesAndNoNotes).then(function(getText){
                    getText = getText.replace(" Notes ", "");
                    return (getText)
                }))
            }
        }))
    }

    ModifyPreWrittenNotes(){
        this.NavigationIcon_BTN_Click();
        return (this.HandleNotesAndNoNotes_Text().then((NoNotestext) => {
            if(!NoNotestext == true){
                this.DeletePreWrittenNotes();
                return (this.WriteAndEditNotes())
            }else{
                this.Close_BTN_Click()
                return (this.WriteAndEditNotes())
            }
        }))
    }

    WriteAndEditNotes(){
        const revision = new Revision();
        const createNote = new CreateNote();
        const notes = new Notes();
        const genericFunctions = new GenericFunctions()
        const editNote = new EditNote();
        revision.CreateNote_BTN_Click();
        createNote.Editor_TXT_Type("salil sharma")
        createNote.SaveNote_BTN_Click()
        // revision.DoNotShowMeAgain_TXT_Click()
        this.NavigationIcon_BTN_Click()
        this.Notes_BTN_Click();
        notes.SelectFirstElementFrom_AllNotes()
        notes.SelectFirstElementFrom_AllEditButton();
        editNote.Editor_TXT_Clear()
        editNote.Editor_TXT_Type("Sam Vatsain")
        createNote.SaveNote_BTN_Click()
        genericFunctions.wait(3000)
        notes.Close_BTN_Click()
        this.NavigationIcon_BTN_Click()
        this.Notes_BTN_Click();
        return (genericFunctions.GetTextFromElement(notes.AllNotes).then((textChanged) => {
            if(textChanged.includes("Sam Vatsain")){
                return true
            }else{
                return false
            }
        }))
    }

    LockedElement_WE_CompareClass(){
        const self = this;
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.CountOfAllElements(this.LockedElement_WE).then((AllTqCount) => {
            self.value = genericFunctions.RandomValueFromCount(AllTqCount);
            return (genericFunctions.CompareAttributeOfSingleElement(self.LockedElement_WE, (self.value-1), "class"))
        }))
    }

}