/// <reference types="cypress" />

import GetUrl from "../../support/GetUrl";
import GenericFunctions from "../../support/GenericFunctions"
import Login from "../../support/Login_po";
import HomePage from "../../support/HomePage_po";
import BookShelf from "../../support/BookShelf_po";
import Chapters from "../../support/Chapters_po";
import Practice_IntroWithTQ from "../../support/Practice_IntroWithTQ_po"
import Practice_po from "../../support/Practice_po"

describe("Practice Test Case", () => {

    Cypress.config("defaultCommandTimeout", 60000)

    beforeEach(() => {
        const geturl = new GetUrl();
        const genericFunctions = new GenericFunctions();
        genericFunctions.GetUrl(geturl.GetUrlForAutomation())
        genericFunctions.UnRegisterServiceWorkerOfBrowser()
    })

    // afterEach(() => {
    //     const genericFunctions = new GenericFunctions();
    //     genericFunctions.ClearCookies()
    // })

    it ("To verify that Practice Again or Begin Practice button should be present on chapter page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_IsVisible().then((ButtonIsVisible) => {
            expect(ButtonIsVisible).to.be.true
        })
    })

    it ("To verify that button should contain text of Practice Again or Begin Practice on chapter page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_TextVisible().then((buttonVisiblity) => {
            expect(buttonVisiblity).to.be.true 
        })
    })

    it ("To verify that Mcq Option type should work properly for correct answer", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice_po = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice_po.CheckForMcqTypeQuestionForCorrectAnswer();
        practice_po.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("Great job! Let's continue.")
        })
    })

    it ("To verify that Scq Option type should work properly for correct answer", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice_po = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice_po.CheckForScqTypeQuestionForCorrectAnswer();
        practice_po.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("Great job! Let's continue.")
        })
    })

    //AssertionError: Timed out retrying after 60000ms: Expected to find element: `button.btn.btn-outline-primary:nth-child(1)`, but never found it.
    it ("To verify that Mcq Option type should work properly for Incorrect answer", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice_po = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice_po.McqTypeQuestionsForWrongAnswer();
        practice_po.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("Uh-oh! Give it another shot!")
        })
    })

    it ("To verify that Practice Again or Begin Practice button on chapter page should be clickable", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const geturl = new GetUrl();
        const genericFunctions = new GenericFunctions()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        genericFunctions.wait(5000)
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        genericFunctions.wait(5000)
        genericFunctions.GetCurrentPageUrl().then((compareUrl) => {
            expect(compareUrl).to.be.equal(geturl.GetPracticeIntroPageUrl())
        })  
    })

    //AssertionError: Timed out retrying after 60000ms: Expected to find element: `button.btn.btn-outline-primary:nth-child(1)`, but never found it.
    it ("To verify that Mcq Option type should work properly for Partially correct answer", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice_po = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice_po.McqTypeQuestionForPartiallyAnswer();
        practice_po.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("You're close! Try again.")
        })
    })

    //AssertionError: Timed out retrying after 60000ms: Expected to find element: `button.btn.btn-outline-primary:nth-child(1)`, but never found it.
    it ("To verify that Scq Option type should work properly for Incorrect answer", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice_po = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice_po.HandleScqTypeQuestionsForInCorrectAnswers();
        practice_po.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("Uh-oh! Give it another shot!")
        })
    })
    
    it ("To verify skipping the question is working fine", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice.CheckSkippingQuestionIsWorkingFine().then((checkSkippingQuestion) => {
           expect(checkSkippingQuestion).to.be.true
        })
    })

    it ("To verify that retry is working fine for Mcq type questions", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice.McqTypeQuestionsForRetryAnswer()
        practice.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("Good going.")
        })
    })

    //AssertionError: Timed out retrying after 60000ms: Expected to find element: `button.btn.btn-outline-primary:nth-child(1)`, but never found it.
    it ("To verify that retry is working fine for Scq type questions", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const practiceInto = new Practice_IntroWithTQ()
        const practice = new Practice_po()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
        practice.ScqTypeQuestionsForRetryAnswer()
        practice.CorrectAnswerTextMssg_TXT_GetText().then((SuccessMessage) => {
            expect(SuccessMessage).to.be.equal("Good going.")
        })
    })

})