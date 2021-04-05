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

    it("15 ->AFS-126 ->syllabus > Manual Status Marking ->To Verify the user should be able to " +
        "Mark the Chapter status as 'Completed In School' Manually", () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).each(($ele) => {
                cy.get($ele).find(bookshelf_abh.Status_Icon).should("be.visible")
            })
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
                var L = $ele.length
                var N = genericFunctions_abh.RandomValueFromCount(`${L}`) - 1
                var chapter_index = []
                var first_index
                genericFunctions_abh.GetSpecificElement($ele, `${N}`).find(bookshelf_abh.Status_Icon).each(($el, index) => {
                    cy.get($el).invoke('attr', "class").then(($el) => {
                        if ($el.includes(bookshelf_abh.NotStudiedStatusClass)) {
                            chapter_index.push(index)
                        }
                    })
                })
                genericFunctions_abh.ClickOnSingleElement($ele, `${N}`)
                cy.wait(5000)
                genericFunctions_abh.GetElement(chapters_abh.AllChapters_WE).then(($el) => {
                    first_index = chapter_index[0]
                    cy.wait(1000)
                    genericFunctions_abh.ClickOnSingleElementWithoutForce($el, `${first_index}`)
                    cy.wait(1000)
                    genericFunctions_abh.ShouldbeVisible(chapters_abh.CompletedInSchool_Btn)
                    genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                    cy.wait(1000)
                    genericFunctions_abh.Click(chapters_abh.Icon_Back)
                    cy.wait(5000)
                })
                genericFunctions_abh.GetSpecificElement(bookshelf_abh.AllSubjects_Tabs, `${N}`).find(bookshelf_abh.Status_Icon).then($e => {
                    genericFunctions_abh.GetSpecificElement($e, `${first_index}`)
                        .invoke('attr', "class").should("include", bookshelf_abh.CompletedInSchool_Class)
                })
            })
        })

    it("16 ->AFS-126 ->syllabus > Manual Status Marking ->To Verify the user should be able to Mark " +
        "the Chapter status as ' Excluded from Syllabus' Manually", () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).each(($ele) => {
                cy.get($ele).find(bookshelf_abh.Status_Icon).should("be.visible")
            })
            const value = bookshelf_abh.SelectRandomBook()
            const val = chapters_abh.SelectRandomChapter()
            genericFunctions_abh.ShouldbeVisible(chapters_abh.Exclude_FromSyllabus_Btn)
            genericFunctions_abh.Click(chapters_abh.Exclude_FromSyllabus_Btn)
            cy.wait(1000)
            genericFunctions_abh.Click(chapters_abh.Icon_Back)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
                genericFunctions_abh.GetSpecificElement($ele, `${value[0]}`).within(() => {
                    genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${val[0]}`)
                        .invoke('attr', "class").should("include", bookshelf_abh.ExcludedfromSyllabusClass)

                })
            })
        })

    it("17 ->AFS-126 ->syllabus > Manual Status Marking ->To Verify the user should not be able  " +
        "to Mark the Chapter status as 'Not Studied' AND 'Low/Medium/High Confidence' Manually", () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).each(($ele) => {
                cy.get($ele).find(bookshelf_abh.Status_Icon).should("be.visible")
            })
            const value = bookshelf_abh.SelectRandomBook()
            const val = chapters_abh.SelectRandomChapter()
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

    it("18 ->AFS-126 ->syllabus>Confidence Score of TP ->To Verify User should be shown the Status " +
        "/ Confidence score of each TP  ", () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).each(($ele) => {
                cy.get($ele).find(bookshelf_abh.Status_Icon).should("be.visible")
            })
            bookshelf_abh.SelectRandomBook()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_Parent_Ele).each(($ele) => {
                genericFunctions_abh.ShouldbeVisible(chapters_abh.AllTopics_WE)
                genericFunctions_abh.GetElement($ele).within(() => {
                    chapters_abh.CheckTypeOfStatusIconVisible()
                    cy.wait(500)
                })
            })
        })
    it("19 ->AFS-126 ->syllabus > 'Not Studied' Status of TP ->To Verify User should be shown" +
        " Not Studied Status for the TP when user has not started that particular TP", () => {
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
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_NotStudied_Icon)
                .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().wait(1000).click()
            genericFunctions_abh.ClickOnElementUsingText(chapters_abh.BeginPractice_Txt)
            cy.wait(10000)
            genericFunctions_abh.GetElement(practice_intro_abh.Pract_Intro_TQ).each(($ele) => {
                genericFunctions_abh.GetElement($ele).within(() => {
                    genericFunctions_abh.ShouldbeVisible(practice_intro_abh.Icon_NotStudied)
                })
            })
        })

    it("20 ->AFS-126 ->syllabus > 'Completed In School' Status of TP ->To Verify User should be shown " +
        "Completed In School Status for the TP which has been marked completed", () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).each(($ele) => {
                cy.get($ele).find(bookshelf_abh.Status_Icon).should("be.visible")
            })
            bookshelf_abh.SelectRandomBook()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_Parent_Ele).each(($ele) => {
                genericFunctions_abh.GetElement($ele).find(chapters_abh.AllTopics_WE).should("be.visible")
            })
            const val = chapters_abh.SelectRandomChapter()
            cy.wait(1000)
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_WE).then(($ele) => {
                genericFunctions_abh.GetSpecificElement($ele, `${val[0]}`)
                    .parents(chapters_abh.AllChapters_Parent_Ele).within(() => {
                        genericFunctions_abh.ShouldbeVisible(chapters_abh.CompletedInSchool_Btn)
                        genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                        cy.wait(1000)
                        chapters_abh.CheckTypeOfStatusIconVisible()
                    })
            })
        })

    it('21 ->AFS-126 ->syllabus > "Low Confidence" Status of TP ->To Verify User should be shown ' +
        ' "Low Confidence" Status for the TP in which user has scored Low Confidence', () => {
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
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_LowConf_Icon).then(($ele) => {
                genericFunctions_abh.GetElement($ele).parents(chapters_abh.AllTopic_Parent_Ele)
                    .scrollIntoView().wait(1000).click()
                genericFunctions_abh.Click(chapters_abh.BeginPracticeAndPracticeAgain_BTN)
                cy.wait(3000)
                genericFunctions_abh.GetElement(practice_intro_abh.Pract_Intro_TQ).then(($ele) => {
                    var Len = $ele.length
                    genericFunctions_abh.GetElement(practice_intro_abh.Icon_NotStudied).then(($el) => {
                        var L = $el.length
                        expect(L).to.be.greaterThan(Len / 2)
                    })
                })
            })
        })

    it.skip('22 ->AFS-126 ->syllabus > "Medium Confidence" Status of the TP->To Verify User should be shown ' +
        '  "Medium Confidence" Status for the TP in which user has scored Medium Confidence', () => {
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

        })

    it('24 ->AFS-126 ->syllabus > "Excluded from Syllabus" Status of TP->To Verify User should be shown ' +
        '"Excluded from Syllabus" Status for the TP which is excluded from the users curriculum', () => {
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
            genericFunctions_abh.GetFirstElement(chapters_abh.AllTopic_ExcludeFromSyllabus_Icon)
                .parents(chapters_abh.AllTopic_Parent_Ele).scrollIntoView().wait(1000)
                .find(chapters_abh.Excluded_Class_Ele).should("be.visible")
        })
})