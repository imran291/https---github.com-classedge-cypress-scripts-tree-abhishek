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

    it("1 -AFS-126_BB-RL_001 -Syllabus- To Verify a user should be shown the Syllabus Option " +
        "in the landing page", () => {

            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.GetSpecificElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
                .should("be.visible")
        })

    it("2 -AFS-126 -Syllabus- To Verify  Syllabus should be Tappable " +
        "in the landing page", () => {

            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
        })

    it("4 -AFS-126 -Syllabus > Bookshelf Resource- To Verify a user should be able" +
        "to view the available Resource of the bookshelf", () => {
            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
        })

    it("6 -AFS-126 -Syllabus > Bookshelf Resource-To Verify a user should be able to view," +
        "the panel of Assignment and Create Study Plan", () => {
            login_abh.CommonLogin();
            cy.wait(15000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.CreateAssignSection)
        })

    it("7 -AFS-126 -syllabus > Status/Confidence Score-To Verify User should be shown Status /" +
        " Confidence score of each chapter against every book listed in user's curriculum", () => {
            login_abh.CommonLogin();
            cy.wait(20000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_HomePage_abh.Homepage_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_HomePage_abh.StudyPlan_Syllabus_Assignment_Tab, "1")
            cy.wait(5000)
            genericFunctions_abh.AssertCurrentUrlWithText(bookshelf_abh.Bookshelf_Url)
            genericFunctions_abh.ShouldbeVisible(bookshelf_abh.AllSubjects_Tabs)
            cy.wait(5000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).each(($ele) => {
                // cy.get($ele).find(bookshelf_abh.Status_Icon).should("be.visible")
                cy.wrap($ele).within(() => {
                    cy.wait(2000)
                    bookshelf_abh.CheckTypeOfStatusIconsVisible()
                })

                // genericFunctions_abh.GetElement(bookshelf_abh.Status_Icon)
                // .invoke("attr","class").should("include",bookshelf_abh.NotStudiedStatusClass)
                // .and("include",bookshelf_abh.LowConfStatusClass)
            })
        })

    it("8 -AFS-126 -syllabus > 'Not Studied' Status-To Verify User should be shown Not Studied Status," +
        "for the chapter in a book, when user has not started that particular chapter", () => {
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
            const index = chapters_abh.FindNotStartedChapter()
            cy.wait(2000)
            cy.log(index)
            cy.log(value)
            genericFunctions_abh.Click(bookshelf_abh.Icon_Back)
            cy.wait(2000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
                var v = value[0]
                cy.log(v)
                genericFunctions_abh.GetSpecificElement($ele, `${v}`).within(() => {
                    index.forEach(val => {
                        genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${val}`)
                            .invoke('attr', "class").should("include", bookshelf_abh.NotStudiedStatusClass)
                    })
                })

            })
        })

    it('9 -AFS-126 -syllabus > "Completed In School" Status -To Verify User should be shown Completed ' +
        " In School Status for the chapter which has been marked completed", () => {
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
            genericFunctions_abh.GetFirstElement(bookshelf_abh.Icon_NotStudied).then(($ele) => {
                cy.get($ele).parents(bookshelf_abh.AllSubjects_Tabs).find("h4.card-title").then(($el) => {
                    var text = $el.text()
                    var i = []
                    cy.get($el).parents(bookshelf_abh.AllSubjects_Tabs)
                        .find(bookshelf_abh.Status_Icon).each(($e, index) => {
                            cy.get($e).invoke("attr", "class").then($elem => {
                                if ($elem.includes(bookshelf_abh.NotStudiedStatusClass)) {
                                    i.push(index)
                                    return false
                                }
                            })
                        })
                        genericFunctions_abh.GetElementWithText(text).then(($txt)=>{
                            genericFunctions_abh.ClickForecefully($txt)
                            cy.wait(5000)
                            cy.log(i)
                            genericFunctions_abh.ClickOnSingleElement(chapters_abh.AllChapters_Heading,`${i[0]}`)
                            cy.wait(2000)
                            genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                            cy.wait(1000)
                            genericFunctions_abh.Click(chapters_abh.Icon_Back)
                            cy.wait(1000)
                            genericFunctions_abh.GetElementWithText(text)
                            .parents(bookshelf_abh.AllSubjects_Tabs).find(bookshelf_abh.Status_Icon)
                            .then(($icon)=>{
                                genericFunctions_abh.GetSpecificElement($icon,`${i[0]}`)
                                .invoke("attr","class").should("include",bookshelf_abh.CompletedInSchool_Class)
                            })
                        })
                })

            })
        })

    it("10 -AFS-126 -syllabus > 'Low Confidence' Status-To Verify User should be shown'Low Confidence'" +
        "Status for the chapter in which user has scored Low Confidence", () => {
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
            const index = chapters_abh.FindLowConfChapter()
            cy.wait(2000)
            cy.log(index)
            cy.log(value)
            genericFunctions_abh.Click(bookshelf_abh.Icon_Back)
            cy.wait(2000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
                var v = value[0]
                cy.log(v)
                genericFunctions_abh.GetSpecificElement($ele, `${v}`).within(() => {
                    index.forEach(val => {
                        genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${val}`)
                            .invoke('attr', "class").should("include", bookshelf_abh.LowConfStatusClass)
                    })
                })

            })
        })

    it("11 ->AFS-126 ->syllabus >'Medium Confidence' Status ->To Verify User should be shown'Low Confidence'" +
        "Status for the chapter in which user has scored Low Confidence", () => {
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
            const index = chapters_abh.FindMidConfChapter()
            cy.wait(2000)
            cy.log(index)
            cy.log(value)
            genericFunctions_abh.Click(bookshelf_abh.Icon_Back)
            cy.wait(2000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
                var v = value[0]
                cy.log(v)
                genericFunctions_abh.GetSpecificElement($ele, `${v}`).within(() => {
                    index.forEach(val => {
                        genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${val}`)
                            .invoke('attr', "class").should("include", bookshelf_abh.MidConfStatusClass)
                    })
                })

            })
        })

    it("12 ->AFS-126 ->syllabus > 'High Confidence' Status ->To Verify User should be shown'Low Confidence'" +
        "Status for the chapter in which user has scored Low Confidence", () => {
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
            const index = chapters_abh.FindMidConfChapter()
            cy.wait(2000)
            cy.log(index)
            cy.log(value)
            genericFunctions_abh.Click(bookshelf_abh.Icon_Back)
            cy.wait(2000)
            genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
                var v = value[0]
                cy.log(v)
                genericFunctions_abh.GetSpecificElement($ele, `${v}`).within(() => {
                    index.forEach(val => {
                        genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${val}`)
                            .invoke('attr', "class").should("include", bookshelf_abh.HighConfStatusClass)
                    })
                })

            })
        })

    it("13 ->AFS-126 ->syllabus > 'Excluded from Syllabus' Status ->To Verify User should be shown 'Excluded from Syllabus' " +
        "Status for the chapter which is excluded from the users curriculum", () => {
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
            cy.wait(2000)
            const flag = chapters_abh.CheckSelectedChapterIsExcluded()
            genericFunctions_abh.GetElement(chapters_abh.AllChapters_WE).then(($ele) => {
                var book = value[0]
                var chapter = val[0]
                var boo = flag[0]
                if (boo == false) {
                    genericFunctions_abh.GetSpecificElement($ele, `${chapter}`)
                        .parents(chapters_abh.Chapter_Expanded)
                        .find(chapters_abh.Exclude_FromSyllabus_Btn).click()
                }
                genericFunctions_abh.Click(bookshelf_abh.Icon_Back)
                cy.wait(2000)
                genericFunctions_abh.GetSpecificElement(bookshelf_abh.AllSubjects_Tabs, `${book}`).within(() => {
                    genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${chapter}`)
                        .invoke('attr', "class").should("include", bookshelf_abh.ExcludedfromSyllabusClass)
                })
            })
        })

    it("14 ->AFS-126 ->syllabus > Confidence Score/Status Priority ->To Verify the Status shown to the user " +
        "for each chapter should be based on Priority", () => {
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
                    genericFunctions_abh.Click(chapters_abh.CompletedInSchool_Btn)
                    cy.wait(1000)
                    genericFunctions_abh.Click(chapters_abh.Icon_Back)
                    cy.wait(5000)
                })
                genericFunctions_abh.GetSpecificElement(bookshelf_abh.AllSubjects_Tabs, `${N}`).find(bookshelf_abh.Status_Icon).then($e => {
                    genericFunctions_abh.GetSpecificElement($e, `${first_index}`)
                        .invoke('attr', "class").should("include", bookshelf_abh.CompletedInSchool_Class)
                    cy.wait(5000)
                    genericFunctions_abh.ClickOnSingleElementWithoutForce(bookshelf_abh.AllSubjects_Tabs, `${N}`)
                    genericFunctions_abh.GetSpecificElement(chapters_abh.AllChapters_WE, `${first_index}`).then(($e) => {
                        cy.get($e).scrollIntoView().wait(1000).click()
                        cy.get($e).parents(chapters_abh.Chapter_Expanded)
                            .find(chapters_abh.Exclude_FromSyllabus_Btn).click()
                    })
                    cy.wait(1000)
                    genericFunctions_abh.Click(bookshelf_abh.Icon_Back)
                    cy.wait(2000)
                    genericFunctions_abh.GetSpecificElement(bookshelf_abh.AllSubjects_Tabs, `${N}`).within(() => {
                        genericFunctions_abh.GetSpecificElement(bookshelf_abh.Status_Icon, `${first_index}`)
                            .invoke('attr', "class").should("include", bookshelf_abh.ExcludedfromSyllabusClass)
                    })

                })
            })

        })

})
