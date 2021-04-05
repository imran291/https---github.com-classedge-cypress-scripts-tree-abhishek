import GenericFunctions_Abh from "../support/GenericFunctions_Abh"
import Revision_Abh from "../support/Revision_po_Abh"
import CreateNote from "../support/CreateNote_po"
import Notes from "../support/Notes_po"
import EditNote from "../support/EditNote_po"
import Chapters_Abh from "../support/Chapters_po_Abh"
import Revision_IntroWithTQ_Abh from "../support/Revision_IntroWithTQ_po_Abh"
import GetApiFunctions from "../support/GetApiFunctions"
import ApiConfig from "../support/ApiConfig"

export default class HamburgerMenu_Abh {

    value = 0
    NavigationIcon_BTN = "span.icon.icon-hamburger-menu"
    Notes_BTN = "button.btn.btn-lg.btn-block.addnote-btn"
    Notes_Created = 'label input[type="radio"]'
    Edit_Note_Btn = "span.icon-edit-black"
    Edit_Note_Field = ".form-field"
    NotesCount_WE = "span.badge.badge-primary"
    Close_Note_Btn = "button.close-icon"
    Close_BTN = "span.icon.icon-close"
    NoNotes_TXT = " No Notes "
    HandleNotesAndNoNotes = "button.btn.btn-lg.btn-block.addnote-btn.d-flex.rounded-0"
    LockedElement_WE = "div.points-nav li.item.locked"
    ConformForDeleteNote_TXT = " Delete note "
    Quiz_Text = "quiz "
    Video_Text = "video "
    Arrow_Btn = "span.icon-overview-down"
    Progress_Overlay = "div.points-nav.ng-star-inserted"
    All_Tqs = ".item.ng-star-inserted"
    Tq_Resources = ".sub-menu li.ng-star-inserted"

    CheckTqResourcesClickable() {
        const revision_abh = new Revision_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetElement(this.Tq_Resources).then(($el) => {
            cy.wrap($el)
            var res_length = $el.length
            for (var i = 0; i < res_length; i++) {
                genericFunctions_abh.GetSpecificElement(this.Tq_Resources, `${i}`).children("a").then(($ele) => {
                    var text = $ele.text()
                    if (text == "video ") {
                        cy.wrap($ele).click()
                        cy.wait(10000)
                        genericFunctions_abh.IsVisible(revision_abh.Que_Points)
                        cy.wait(2000)
                        genericFunctions_abh.Click(this.NavigationIcon_BTN)
                    }
                    else if (text == "quiz ") {
                        cy.wait(2000)
                        cy.wrap($ele).click()
                        genericFunctions_abh.IsVisible(revision_abh.Quiz_Container)
                        cy.wait(2000)
                        genericFunctions_abh.Click(this.NavigationIcon_BTN)
                    }
                    else if (text == "summary ") {
                        cy.wait(2000)
                        cy.wrap($ele).click()
                        genericFunctions_abh.IsVisible(revision_abh.Summary_Box)
                        cy.wait(2000)
                        genericFunctions_abh.Click(this.NavigationIcon_BTN)
                    }
                })
            }
        })
    }

    HandleNotesAndNoNotes_Text() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(2000)
        return (genericFunctions_abh.GetTextFromElement(this.HandleNotesAndNoNotes).then((text) => {
            if (text === self.NoNotes_TXT) {
                return true;
            } else {
                return false
            }
        }))
    }

    ConformForDeleteNote_TXT_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickOnElementUsingText(this.ConformForDeleteNote_TXT)
    }

    NavigationIcon_BTN_ClickWithoutCheck() {
        const genericFunctions_abh = new GenericFunctions_Abh()
        genericFunctions_abh.ClickForecefully(this.NavigationIcon_BTN)
    }

    NavigationIcon_BTN_Click() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh();
        const revision_abh = new Revision_Abh()
        revision_abh.CreateNote_BTN_IsVisible().then((visibility) => {
            if (visibility == true) {
                genericFunctions_abh.ClickForecefully(self.NavigationIcon_BTN);
            }
        })
    }

    NotesCount_WE_GetCount() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(3000)
        return (genericFunctions_abh.GetTextFromElement(this.NotesCount_WE))
    }

    Notes_BTN_IsVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsVisible(this.Notes_BTN))
    }

    Notes_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.Click(this.Notes_BTN)
    }

    Close_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.Click(this.Close_BTN)
    }

    DeletePreWrittenNotes() {
        const self = this
        const notes = new Notes()
        const genericFunctions_abh = new GenericFunctions_Abh();
        this.HandleNotesAndNoNotes_Text().then((NoNotesTxt) => {
            if (!NoNotesTxt == true) {
                self.Notes_BTN_Click();
                cy.wait(3000)
                notes.AllNotes_GetCount().then((totalCount) => {
                    for (let i = 0; i <= (totalCount - 1); i++) {
                        genericFunctions_abh.ClickOnSingleElement(notes.AllNotes, 0)
                        genericFunctions_abh.wait(1000)
                        genericFunctions_abh.ElementScrollIntoView(notes.AllDelete_TXT, 0, 1)
                        genericFunctions_abh.ClickOnSingleElement(notes.AllDelete_TXT, 0)
                        this.ConformForDeleteNote_TXT_Click()
                    }
                })
                // notes.Close_BTN_Click()      
            } else {
                self.Close_BTN_Click()
            }
        })
    }

    DeleteNotes() {
        const revision_abh = new Revision_Abh();
        const createNote = new CreateNote();
        const genericFunctions_abh = new GenericFunctions_Abh();
        this.NavigationIcon_BTN_Click();
        return (this.HandleNotesAndNoNotes_Text().then((NoNotestext) => {
            if (!NoNotestext == true) {
                this.DeletePreWrittenNotes();
                this.NavigationIcon_BTN_Click();
                genericFunctions_abh.wait(3000)
                return (this.HandleNotesAndNoNotes_Text())
            } else {
                this.Close_BTN_Click();
                revision_abh.CreateNote_BTN_Click();
                createNote.CreateBulkNotes()
                this.NavigationIcon_BTN_Click();
                this.DeletePreWrittenNotes();
                this.NavigationIcon_BTN_Click();
                genericFunctions_abh.wait(3000)
                return (this.HandleNotesAndNoNotes_Text())
            }
        }))
    }

    CountOfCueWithTheNotesCreated() {
        const revision_abh = new Revision_Abh();
        const createNote = new CreateNote();
        const getApiFunctions = new GetApiFunctions()
        const genericFunctions_abh = new GenericFunctions_Abh();
        const self = this
        return (this.HandleNotesAndNoNotes_Text().then((NoNotestext) => {
            if (!NoNotestext == true) {
                this.DeletePreWrittenNotes();
                this.NavigationIcon_BTN_Click();
                self.CountOfCueWithTheNotesCreated()
            } else {
                this.Close_BTN_Click();
                revision_abh.CreateNote_BTN_Click();
                createNote.CreateBulkNotes()
                this.NavigationIcon_BTN_Click();
                return (genericFunctions_abh.GetTextFromElement(this.HandleNotesAndNoNotes).then(function (getText) {
                    getText = getText.replace(" Notes ", "");
                    return (getText)
                }))
            }
        }))
    }

    ModifyPreWrittenNotes() {
        this.NavigationIcon_BTN_Click();
        return (this.HandleNotesAndNoNotes_Text().then((NoNotestext) => {
            if (!NoNotestext == true) {
                this.DeletePreWrittenNotes();
                return (this.WriteAndEditNotes())
            } else {
                this.Close_BTN_Click()
                return (this.WriteAndEditNotes())
            }
        }))
    }

    WriteAndEditNotes() {
        const revision_abh = new Revision_Abh();
        const createNote = new CreateNote();
        const notes = new Notes();
        const genericFunctions_abh = new GenericFunctions_Abh()
        const editNote = new EditNote();
        revision_abh.CreateNote_BTN_Click();
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
        genericFunctions_abh.wait(3000)
        notes.Close_BTN_Click()
        this.NavigationIcon_BTN_Click()
        this.Notes_BTN_Click();
        return (genericFunctions_abh.GetTextFromElement(notes.AllNotes).then((textChanged) => {
            if (textChanged.includes("Sam Vatsain")) {
                return true
            } else {
                return false
            }
        }))
    }

    LockedElement_WE_CompareClass() {
        const self = this;
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.CountOfAllElements(this.LockedElement_WE).then((AllTqCount) => {
            self.value = genericFunctions_abh.RandomValueFromCount(AllTqCount);
            return (genericFunctions_abh.CompareAttributeOfSingleElement(self.LockedElement_WE, (self.value - 1), "class"))
        }))
    }

}