/// <reference types="cypress" />

import Login from "../../support/Login_po";
import GetUrl from "../../support/GetUrl";
import HomePage from "../../support/HomePage_po";
import BookShelf from "../../support/BookShelf_po";
import Chapters from "../../support/Chapters_po";
import IntroWithTQ from "../../support/Revision_IntroWithTQ_po";
import Revision from "../../support/Revision_po";
import GenericFunctions from "../../support/GenericFunctions"
import HamburgerMenu from "../../support/HamburgerMenu_po"
import CreateNote from "../../support/CreateNote_po"

describe("Create_Notes Test Cases", () => {

    Cypress.config("defaultCommandTimeout", 60000)
    
    beforeEach(() => {
        const geturl = new GetUrl();
        const genericFunctions = new GenericFunctions();
        genericFunctions.GetUrl(geturl.GetUrlForAutomation())
        genericFunctions.UnRegisterServiceWorkerOfBrowser();
    })

    // afterEach(() => {
    //     const genericFunctions = new GenericFunctions();
    //     genericFunctions.ClearCookies()
    // })

    it ("To verify that Revise Again or Begin Revise button should be present on chapter page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginReviseAndReviseAgain_BTN_IsVisible().then((ButtonIsVisible) => {
            expect(ButtonIsVisible).to.be.true
        })
    })

    it ("To verify that button should contain text of Revise Again or Begin Revise on chapter page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginReviseAndReviseAgainTextVisible().then((TextOnButton) => {
            expect(TextOnButton).to.be.true
        })
    })

    it ("To verify that Revise Again or Begin Revise button on chapter page should be clickable", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const genericFunctions = new GenericFunctions();
        const geturl = new GetUrl();
        const intro = new IntroWithTQ();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.HandleBeginReviseAndReviseAgain()
        intro.BeginReviseAndReviseAgain_BTN_IsVisible().then((buttonVisibility) => {
            genericFunctions.wait(3000)
            if(buttonVisibility != false){
                genericFunctions.GetCurrentPageUrl().then((compareUrl) => {
                    expect(compareUrl).to.be.equal(geturl.GetIntroPageUrl())
                })
            }
        }) 
    })

    it ("To verify that on tapping back button from intro page user should land on bookshelf page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const genericFunctions = new GenericFunctions();
        const geturl = new GetUrl();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.HandleBeginReviseAndReviseAgain()
        intro.BeginReviseAndReviseAgain_BTN_IsVisible().then((buttonVisibility) => {
            if(buttonVisibility){
                intro.BackButton_BTN_Click();
                genericFunctions.GetCurrentPageUrl().then((url) => {
                    expect(url).to.be.equal(geturl.GetChaptersPageUrl())
                })
            }
        })    
    })

    it ("To verify that Revise Again or Begin Revise button should be present on intro page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.HandleBeginReviseAndReviseAgain()
        intro.BeginReviseAndReviseAgainTextVisible().then((ButtonVisible) => {
            expect(ButtonVisible).to.be.true
        })
    })

    it ("To verify that button should contain Revise again or Begin Revise on an intro page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.HandleBeginReviseAndReviseAgain()
        intro.BeginReviseAndReviseAgainTextVisible().then((TextOnButton) => {
            expect(TextOnButton).to.be.true
        })
    })

    it ("To verify that Revise again or Begin Revise button should be clickable on intro page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const revision = new Revision();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        revision.CreateNote_BTN_IsDetached().then((CreateNoteButtonVisible) => {
            expect(CreateNoteButtonVisible).to.be.true
        })
    })

    it ("To verify that Create note icon is visible on Revision page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const revision = new Revision();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        revision.CreateNote_BTN_IsVisible().then((CreateNoteButtonVisible) => {
            expect(CreateNoteButtonVisible).to.be.true
        })
    })

    it ("To verify that created note count should be match", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const hamburgerMenu = new HamburgerMenu();
        const revision = new Revision();
        const createNote = new CreateNote();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        hamburgerMenu.NavigationIcon_BTN_Click();
        hamburgerMenu.DeletePreWrittenNotes()
        revision.CreateNote_BTN_Click()
        createNote.CreateBulkNotes()
        hamburgerMenu.NavigationIcon_BTN_Click()
        hamburgerMenu.NotesCount_WE_GetCount().then((notesCount) => {
            expect(parseInt(notesCount)).to.equal(6)
        })
    })

    it ("To verify that user is able to modify Create note", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const hamburgerMenu = new HamburgerMenu();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        hamburgerMenu.ModifyPreWrittenNotes().then((modification) => {
            expect(modification).to.be.true
        })
    })    

    it ("To verify that user is able to delete the note", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const hamburgerMenu = new HamburgerMenu();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        hamburgerMenu.DeleteNotes().then((DeletionOfNotes) => {
            expect(DeletionOfNotes).to.be.true
        })
    }) 

    it ("To verify count of cue should be match with count of the notes user created", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const hamburgerMenu = new HamburgerMenu();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        hamburgerMenu.NavigationIcon_BTN_Click();
        hamburgerMenu.CountOfCueWithTheNotesCreated().then((responselength) => {
            expect(responselength).to.equal("6")
        })
    })

    it ("To verify the status of topic for revise", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const hamburgerMenu = new HamburgerMenu()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.FindMultipleTqTopic()
        hamburgerMenu.NavigationIcon_BTN_Click();
        hamburgerMenu.LockedElement_WE_CompareClass().should("contain", "locked")
    })

    it ("To verify that No Topic visible under chapter section contains 0 mins", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.DurationOfTopicShouldNotBeZero().then((TopicDuration) => {
            expect(TopicDuration.text()).not.to.includes(" 0 mins ")
        })
    })

    it ("To verify that user is able to write 3000 characters in notes", () => { // No message is visible to assert this
        const genericFunctions = new GenericFunctions();
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const createNote = new CreateNote();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        createNote.CreateNoteMoreThen3000Characters();
        createNote.ChatacterExceedMessage_TXT_GetText().then(elementExit => {
            expect(elementExit).to.equal("Character limit exceeded")
        })
    })

    it ("To verify that discard message should be visible to the user when user click on close button", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const createNote = new CreateNote();
        const revision = new Revision()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        revision.CreateNote_BTN_Click()
        createNote.Editor_TXT_Type("salil")
        createNote.Close_BTN_Click()
        createNote.Discard_Yes_BTN_IsVisible().then((visibility) => {
            expect(visibility).to.be.true
        })
    })


    it ("To verify that save button will be disabled in the beginning for notes", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const intro = new IntroWithTQ();
        const createNote = new CreateNote();
        const revision = new Revision()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook()
        chapter.SelectRandomTopic()
        chapter.HandleBeginReviseAndReviseAgain()
        intro.HandleBeginReviseAndReviseAgain()
        revision.CreateNote_BTN_Click()
        createNote.SaveNote_BTN_IsDisabled().then((visibility) => {
            expect(visibility).to.be.true
        })
    })

})