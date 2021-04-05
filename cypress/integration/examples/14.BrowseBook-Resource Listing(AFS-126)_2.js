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
import Practice_IntroWithTQ_Abh from "../../support/Practice_IntroWithTQ_po_Abh"
// import { includes } from 'cypress/types/lodash';

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
    const practice_intro_abh = new Practice_IntroWithTQ_Abh();


    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    it('25 ->AFS-126 ->syllabus > Confidence Score/Status Priority Of TP->To Verify the Status shown ' +
        'to the user for each TP should be based on Priority', () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            bookshelf_abh.SelectRandomBook()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_Parent_Ele).each(($ele) => {
                genericFunctions_abh.GetElement($ele).find(chapters_abh.AllTopics_WE).should("be.visible")
            })
            // var Icon = [chapters_abh.AllTopic_NotStudied_Icon, chapters_abh.AllTopic_LowConf_Icon
            //     , chapters_abh.AllTopic_MidConf_Icon, chapters_abh.AllTopic_HighConf_Icon]

            // var Class = [chapters_abh.AllTopic_CompInSchool_Class, chapters_abh.AllTopic_LowConf_Class
            //     , chapters_abh.AllTopic_MidConf_Class, chapters_abh.AllTopic_HighConf_Class,
            // chapters_abh.AllTopic_ExcludeFromSyllabus_Class]
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_NotStudied_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele)
                    .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().within(($el) => {
                        cy.wait(1000)
                        genericFunctions_abh.Click($el)
                        cy.wait(1000)
                        genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_CompInSchool_Class)
                    })
            })
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_LowConf_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele)
                    .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().within(($el) => {
                        cy.wait(1000)
                        genericFunctions_abh.Click($el)
                        cy.wait(1000)
                        genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_LowConf_Class)
                    })
            })

            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_MidConf_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele)
                    .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().within(($el) => {
                        cy.wait(1000)
                        genericFunctions_abh.Click($el)
                        cy.wait(1000)
                        genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_MidConf_Class)
                    })
            })
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_HighConf_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele)
                    .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().within(($el) => {
                        cy.wait(1000)
                        genericFunctions_abh.Click($el)
                        cy.wait(1000)
                        genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_HighConf_Class)
                        cy.wait(2000)
                        genericFunctions_abh.Click(chapters_abh.Exclude_FromSyllabus_Btn)
                        cy.wait(2000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_ExcludeFromSyllabus_Class)
                    })
            })

        })

    it('26 ->AFS-126 ->syllabus > Manual Status Marking of TP->To Verify the user should be able ' +
        'to Mark the TP status as " Completed In School" Manually', () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            bookshelf_abh.SelectRandomBook()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_Parent_Ele).each(($ele) => {
                genericFunctions_abh.GetElement($ele).find(chapters_abh.AllTopics_WE).should("be.visible")
            })
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_NotStudied_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele)
                    .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().within(($el) => {
                        cy.wait(1000)
                        genericFunctions_abh.Click($el)
                        cy.wait(1000)
                        genericFunctions_abh.ShouldbeVisible(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_CompInSchool_Class)
                    })
            })
        })

    it('27 ->AFS-126 ->syllabus > Manual Status Marking of TP-> To Verify the user should be able' +
        'to Mark the TP status as " Excluded from Syllabus" Manually', () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            bookshelf_abh.SelectRandomBook()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_Parent_Ele).each(($ele) => {
                genericFunctions_abh.GetElement($ele).find(chapters_abh.AllTopics_WE).should("be.visible")
            })
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_Conf_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele)
                    .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().within(($el) => {
                        cy.wait(1000)
                        genericFunctions_abh.Click($el)
                        cy.wait(1000)
                        genericFunctions_abh.ShouldbeVisible(chapters_abh.Exclude_FromSyllabus_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.Click(chapters_abh.Exclude_FromSyllabus_Btn)
                        cy.wait(1000)
                        genericFunctions_abh.GetElement(chapters_abh.AllTopic_Conf_Icon)
                            .invoke("attr", "class")
                            .should("include", chapters_abh.AllTopic_ExcludeFromSyllabus_Class)
                    })
            })
        })

    it('28 ->AFS-126 ->syllabus > Manual Status Marking of TP-> To Verify the user should not be able' +
        'to Mark the TP status as "Not Studied" AND "Low/Medium/High Confidence" Manually', () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            var val = bookshelf_abh.SelectRandomBook()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_Parent_Ele).each(($ele) => {
                genericFunctions_abh.GetElement($ele).find(chapters_abh.AllTopics_WE).should("be.visible")
            })
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_WE).then(($ele) => {
                genericFunctions_abh.GetSpecificElement($ele, `${val[0]}`)
                    .parents(chapters_abh.AllChapters_Parent_Ele).within(() => {
                        genericFunctions_abh.GetElementWithText("Not Studied").should("not.exist")
                        genericFunctions_abh.GetElementWithText("Low Confidence").should("not.exist")
                        genericFunctions_abh.GetElementWithText("Medium Confidence").should("not.exist")
                        genericFunctions_abh.GetElementWithText("High Confidence").should("not.exist")
                    })
            })

        })
})