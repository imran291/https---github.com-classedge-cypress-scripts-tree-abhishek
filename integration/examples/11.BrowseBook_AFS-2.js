/// <reference types="cypress" />

import 'cypress-wait-until';
import { should } from 'chai';
import { Runnable } from 'mocha';
//Abh
import GenericFunctions_Abh from "../../support/GenericFunctions_Abh";
import StudyPlan_Progress_Abh from "../../support/StudyPlan_progress_Abh";
import StudyPlan_PortionBook_Abh from "../../support/StudyPlan_portion-book_Abh";
import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh";
import StudyPlan_HomePage_Abh from "../../support/StudyPlan_HomePage_Abh"
import GetUrl_Abh from "../../support/GetUrl_Abh";
import Config_Abh from "../../support/Config_Abh";
import Login_Abh from "../../support/Login_po_Abh";
import Chapters_Abh from "../../support/Chapters_po_Abh";
import BookShelf_Abh from "../../support/BookShelf_po_Abh"
import Revision_IntroWithTQ_Abh from "../../support/Revision_IntroWithTQ_po_Abh"
import Revision_Abh from "../../support/Revision_po_Abh"
import HamburgerMenu_Abh from "../../support/HamburgerMenu_po_Abh"

describe("Study BrowsBook Cases", () => {

    Cypress.config("defaultCommandTimeout", 40000)
    const geturl_abh = new GetUrl_Abh();
    const login_abh = new Login_Abh();
    const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
    const genericFunctions_abh = new GenericFunctions_Abh();
    const bookshelf_abh = new BookShelf_Abh();
    const chapters_abh = new Chapters_Abh();
    const revision_intro_abh = new Revision_IntroWithTQ_Abh();
    const revision_abh = new Revision_Abh();
    const hamburgerMenu_abh = new HamburgerMenu_Abh();


    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    // it("visit url", () => {
    //     genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
    //     login_abh.CommonLogin();
    //     cy.wait(15000)
    // })

    it("2-AFS-2-Revision>Syllabus>Landing-To Verify user should be able to" +
        "Launch Revision via My Syllabuss", () => {

            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.GetUrl("https://afs-qa-learn.testedgeonline.com/menu")
            genericFunctions_abh.IsVisible(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab)
            genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(2000)
            genericFunctions_abh.IsVisible(bookshelf_abh.AllSubjects_WE)
            bookshelf_abh.SelectRandomBook()
            chapters_abh.SelectRandomChapter()
            chapters_abh.SelectRandomTopic()
            genericFunctions_abh.IsVisible(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.ClickWithScollIntoView(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.AssertCurrentUrlWithText(revision_intro_abh.Revision_Intro_Url)

        })
    it("AFS-2_Rev_BB_004 -Revision> Syllabus> TQ Video- To Verify user should be able to view video" +
        "on attempt of Revision from the Syllabus", () => {
            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.IsVisible(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(2000)
            genericFunctions_abh.IsVisible(bookshelf_abh.AllSubjects_WE)
            bookshelf_abh.SelectRandomBook()
            chapters_abh.SelectRandomChapter()
            chapters_abh.SelectRandomTopic()
            genericFunctions_abh.IsVisible(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.ClickWithScollIntoView(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.AssertCurrentUrlWithText(revision_intro_abh.Revision_Intro_Url)
            genericFunctions_abh.GetElement(revision_intro_abh.AllTq_WE).then(($el) => {
                var tq_len = $el.length
                genericFunctions_abh.Click(revision_intro_abh.BeginRevise_BTN)
                cy.wait(5000)
                for (var i = 0; i < tq_len; i++) {
                    // genericFunctions_abh.IsVisible(revision_abh.Play_Btn_Class)
                    genericFunctions_abh.GetElement(revision_abh.Pause_Play_Btn).invoke('attr', "class")
                        .should("include", revision_abh.Play_Btn_Class)
                    cy.wait(2000)
                    genericFunctions_abh.ClickForecefully(revision_abh.Pause_Play_Btn)
                    cy.wait(2000)
                    genericFunctions_abh.ClickForecefully(revision_abh.Pause_Play_Btn)
                    genericFunctions_abh.IsVisible(revision_abh.Que_Points)
                    genericFunctions_abh.ClickForecefully(revision_abh.Hamburger_Menu_Btn)
                    cy.wait(1000)
                    genericFunctions_abh.IsVisible(hamburgerMenu_abh.Notes_BTN)
                    genericFunctions_abh.Click("span.icon-close")
                    genericFunctions_abh.GetElementWithTimeout(revision_abh.Video_End_Btn, "6000000")
                    genericFunctions_abh.GetElement(revision_abh.Pause_Play_Btn).invoke('attr', "class")
                        .should("include", revision_abh.Video_End_Btn_Class)
                    genericFunctions_abh.ClickOnElementUsingTextWithTime(revision_abh.Continue_Btn_Text, "6000000")
                    genericFunctions_abh.ClickOnElementUsingTextWithTime(revision_abh.Skip_Btn_Text, "6000000")
                    genericFunctions_abh.ClickOnElementUsingTextWithTime(revision_abh.Continue_Btn_Text, "6000000")
                }
            })
            cy.wait(2000)
            genericFunctions_abh.ClickForecefully(revision_abh.Back_BTN)
        })

    it("AFS-2_Rev_BB_005 -Revision>Syllabus>Revise Quiz- To Verify user should be able to view and" +
        " attempt Quiz on taking Revision from the Syllabus", () => {

            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.IsVisible(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab)
            cy.wait(2000)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            genericFunctions_abh.IsVisible(bookshelf_abh.AllSubjects_WE)
            bookshelf_abh.SelectRandomBook()
            chapters_abh.SelectRandomChapter()
            chapters_abh.SelectRandomTopic()
            genericFunctions_abh.IsVisible(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.ClickWithScollIntoView(chapters_abh.BeginReviseAndReviseAgain_BTN)
            cy.wait(2000)
            genericFunctions_abh.GetElement(revision_intro_abh.All_TQ).then(($ele) => {
                var Tqs = $ele.length
                cy.log(Tqs)
                revision_intro_abh.HandleBeginRevise_And_ReviseAgain()
                genericFunctions_abh.AssertCurrentUrlWithText(revision_intro_abh.Revision_Intro_Url)
                genericFunctions_abh.ClickOnElementUsingText(revision_abh.Skip_Btn_Text)
                cy.wait(2000)
                genericFunctions_abh.IsVisible(revision_abh.Quiz_Container)
                genericFunctions_abh.GetElement(revision_abh.NumberOf_QuizQuestions).then(($el) => {
                    var i = 1
                    cy.scrollTo("bottom").wait(1000)
                    var que = $el.length
                    cy.log(que)
                    cy.wrap($el).should("have.length.greaterThan", 1)

                    if (Tqs > 1) {
                        i = 2
                        revision_abh.HandleShowAnswerQue()
                        revision_abh.HandleRadioQue()
                        genericFunctions_abh.ClickOnElementUsingText(revision_abh.Skip_Btn_Text)
                        genericFunctions_abh.ClickOnElementUsingText(revision_abh.Continue_Btn_Text)
                        genericFunctions_abh.IsVisible(revision_abh.Que_Points).wait(10000)
                        genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
                        cy.wait(2000)
                        genericFunctions_abh.ClickOnFirstElement(hamburgerMenu_abh.Arrow_Btn)
                        genericFunctions_abh.GetElementWithText(hamburgerMenu_abh.Quiz_Text).then(($ele) => {
                            cy.wrap($ele).parents("li").invoke('attr', "class")
                                .should("include", "disabled")
                        })
                        genericFunctions_abh.ClickOnElementUsingText(hamburgerMenu_abh.Video_Text)
                        genericFunctions_abh.ClickOnElementUsingText(revision_abh.Skip_Btn_Text)
                        revision_abh.CheckStateOfAnsweredQue()
                        genericFunctions_abh.Click(revision_abh.Next_Que_Btn)
                    }
                    for (i; i < que; i++) {
                        revision_abh.HandleShowAnswerQue()
                        revision_abh.HandleRadioQue()
                        cy.wait(1000)
                    }
                })
            })
            genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
            cy.wait(1000)
            genericFunctions_abh.GetElementWithText(hamburgerMenu_abh.Quiz_Text).then(($ele) => {
                cy.wrap($ele).parents("li").invoke('attr', "class")
                    .should("not.include", "disabled")
            })
        })

    it.only("AFS-2_Rev_BB_006 -Revision>Syllabus>Revise Navigator- To Verify user should have quick access" +
        "to the Revise Navigator at all times during the Revision", () => {
            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.IsVisible(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab)
            cy.wait(2000)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            genericFunctions_abh.IsVisible(bookshelf_abh.AllSubjects_WE)
            bookshelf_abh.SelectRandomBook()
            chapters_abh.SelectRandomChapter()
            chapters_abh.SelectRandomTopic()
            genericFunctions_abh.IsVisible(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.ClickWithScollIntoView(chapters_abh.BeginReviseAndReviseAgain_BTN)
            cy.wait(2000)
            genericFunctions_abh.GetElement(revision_intro_abh.All_TQ).then(($ele) => {
                var Tqs = $ele.length
                revision_intro_abh.HandleBeginRevise_And_ReviseAgain()
                genericFunctions_abh.AssertCurrentUrlWithText(revision_intro_abh.Revision_Intro_Url)
                cy.wait(10000)
                revision_abh.HandleNoteContinueBtn()
                genericFunctions_abh.Click(revision_abh.CreateNote_BTN)
                genericFunctions_abh.Type(revision_abh.Type_Note, "This is my note")
                genericFunctions_abh.ClickOnElementUsingText(revision_abh.Save_Note_Text)
                cy.wait(2000)
                genericFunctions_abh.IsVisible(hamburgerMenu_abh.NavigationIcon_BTN)
                genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
                genericFunctions_abh.IsVisible(hamburgerMenu_abh.Progress_Overlay)
                genericFunctions_abh.IsVisible(hamburgerMenu_abh.All_Tqs)
                genericFunctions_abh.GetSpecificElement(hamburgerMenu_abh.All_Tqs, "0")
                    .invoke('attr', "class").should("include", "inprogress")
                if (Tqs > 1) {
                    genericFunctions_abh.GetSpecificElement(hamburgerMenu_abh.All_Tqs, "0").nextAll()
                        .invoke('attr', "class").should("include", "locked")
                }
                genericFunctions_abh.GetSpecificElement(hamburgerMenu_abh.Tq_Resources, "0").children("a")
                    .should("have.attr", "style", "font-weight: 600;")
                genericFunctions_abh.GetSpecificElement(hamburgerMenu_abh.Tq_Resources, "0").nextAll()
                    .invoke('attr', "class").should("include", "disabled")
                genericFunctions_abh.Click(hamburgerMenu_abh.Close_BTN)
                genericFunctions_abh.ClickOnElementUsingText(revision_abh.Skip_Btn_Text)
                genericFunctions_abh.GetElement(revision_abh.NumberOf_QuizQuestions).then(($el) => {
                    var que = $el.length
                    for (var i = 1; i < que; i++) {
                        revision_abh.HandleShowAnswerQue()
                        revision_abh.HandleRadioQueWithCorrectAnswer()
                        revision_abh.HandleDragDropQue()
                        cy.wait(2000)
                    }
                })
                genericFunctions_abh.ClickOnElementUsingText(revision_abh.Continue_Btn_Text)
                cy.wait(2000)
                genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
                genericFunctions_abh.GetElement(hamburgerMenu_abh.Tq_Resources).invoke('attr', "class")
                    .should("not.include", "disabled")
                // genericFunctions_abh.GetElement(hamburgerMenu_abh.Tq_Resources).children("a")
                //     .should("have.attr", "style", "font-weight: 600;")
                hamburgerMenu_abh.CheckTqResourcesClickable()
                genericFunctions_abh.IsVisible(hamburgerMenu_abh.Notes_BTN)
                genericFunctions_abh.Click(hamburgerMenu_abh.Notes_BTN)
                genericFunctions_abh.IsVisible(hamburgerMenu_abh.Notes_Created)
                genericFunctions_abh.Click(hamburgerMenu_abh.Close_Note_Btn)
                if (Tqs > 1) {
                    genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
                    genericFunctions_abh.GetElement(hamburgerMenu_abh.Tq_Resources).last().click()
                    genericFunctions_abh.Click(hamburgerMenu_abh.Close_BTN)
                    genericFunctions_abh.ClickOnElementUsingText(revision_abh.Continue_Btn_Text)
                    cy.wait(10000)
                    for (var i = 1; i < Tqs; i++) {
                        genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
                        genericFunctions_abh.GetSpecificElement(hamburgerMenu_abh.All_Tqs, `${i - 1}`)
                            .invoke('attr', "class").should("include", "completed")
                        genericFunctions_abh.GetSpecificElement(hamburgerMenu_abh.All_Tqs, `${i}`)
                            .invoke('attr', "class").should("not.include", "locked")
                        genericFunctions_abh.Click(hamburgerMenu_abh.Close_BTN)
                        genericFunctions_abh.ClickOnElementUsingText(revision_abh.Skip_Btn_Text)
                        cy.wait(2000)
                        genericFunctions_abh.GetElement(revision_abh.NumberOf_QuizQuestions).then(($el) => {
                            var que = $el.length
                            for (var k = 1; k < que; k++) {
                                revision_abh.HandleShowAnswerQue()
                                revision_abh.HandleRadioQueWithCorrectAnswer()
                                revision_abh.HandleDragDropQue()
                                cy.wait(1000)
                            }
                        })
                        genericFunctions_abh.ClickOnElementUsingText(revision_abh.Continue_Btn_Text)
                        genericFunctions_abh.ClickOnElementUsingText(revision_abh.Continue_Btn_Text)
                    }
                }
                if (Tqs == 1) {
                    genericFunctions_abh.ClickOnElementUsingText(revision_abh.Continue_Btn_Text)
                }
                genericFunctions_abh.GetElement(revision_intro_abh.All_TQ).invoke('attr', "class")
                    .should("include", "completed")
                genericFunctions_abh.IsVisibleWithContains(" Continue Studying ")
            })
        })

    it("AFS-2_Rev_BB_024 -Revision> Syllabus> Negative Scenarios- To verify the behaviour of the app" +
        "when user attempting quiz and then user refresh the page ", () => {
            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.IsVisible(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab)
            cy.wait(2000)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            genericFunctions_abh.IsVisible(bookshelf_abh.AllSubjects_WE)
            bookshelf_abh.SelectRandomBook()
            chapters_abh.SelectRandomChapter()
            chapters_abh.SelectRandomTopic()
            genericFunctions_abh.IsVisible(chapters_abh.BeginReviseAndReviseAgain_BTN)
            genericFunctions_abh.ClickWithScollIntoView(chapters_abh.BeginReviseAndReviseAgain_BTN)
            cy.wait(2000)
            revision_intro_abh.HandleBeginRevise_And_ReviseAgain()
            cy.wait(10000)
            cy.reload()
            revision_intro_abh.HandleBeginRevise_And_ReviseAgain()
            cy.wait(10000)
            revision_abh.HandleNoteContinueBtn()
            genericFunctions_abh.Click(revision_abh.CreateNote_BTN)
            genericFunctions_abh.Type(revision_abh.Type_Note, "This is my note")
            cy.reload()
            revision_intro_abh.HandleBeginRevise_And_ReviseAgain()
            cy.wait(10000)
            genericFunctions_abh.Click(revision_abh.CreateNote_BTN)
            genericFunctions_abh.Type(revision_abh.Type_Note, "This is my note")
            genericFunctions_abh.ClickOnElementUsingText(revision_abh.Save_Note_Text)
            genericFunctions_abh.Click(hamburgerMenu_abh.NavigationIcon_BTN)
            genericFunctions_abh.Click(hamburgerMenu_abh.Notes_BTN)
            genericFunctions_abh.Click(hamburgerMenu_abh.Notes_Created)
            genericFunctions_abh.ClickOnFirstElement(hamburgerMenu_abh.Edit_Note_Btn)
            genericFunctions_abh.ClickOnFirstElement(hamburgerMenu_abh.Edit_Note_Field)
            cy.wait(2000)
            cy.reload()
            revision_intro_abh.HandleBeginRevise_And_ReviseAgain()
            cy.wait(10000)
            genericFunctions_abh.ClickOnElementUsingText(revision_abh.Skip_Btn_Text)
            cy.wait(2000)
            genericFunctions_abh.Click(revision_abh.Next_Que_Btn)
            cy.wait(2000)
            cy.reload()
        })
})
