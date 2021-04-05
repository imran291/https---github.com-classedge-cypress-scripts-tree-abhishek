/// <reference types="cypress" />

import 'cypress-wait-until';

//Abh
import GenericFunctions_Abh from "../../support/GenericFunctions_Abh"
import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh"
import StudyPlan_Myplans_Abh from "../../support/StudyPlan_my-plans_Abh"
import StudyPlan_Progress_Abh from "../../support/StudyPlan_progress_Abh";
import StudyPlan_HomePage_Abh from "../../support/StudyPlan_HomePage_Abh"
import GetUrl_Abh from "../../support/GetUrl_Abh";
import Config_Abh from "../../support/Config_Abh";
import Login_Abh from "../../support/Login_po_Abh";
import StudyPlan_PausedPlan from "../../support/StudyPlan_Paused-plan_Abh"
import HomePage_Abh from "../../support/HomePage_po_Abh"

describe("Study Plan Cases", () => {

    Cypress.config("defaultCommandTimeout", 20000)

    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    it("1-AFS-1045 - MyLesson-Navigation - To Verify User shoud be able to navigate to My Lesson from study plan ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_pausedPlan = new StudyPlan_PausedPlan();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_pausedPlan.HandlePausedPlan()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
    })

    it("2-AFS-1045 -MyLesson-Content- To Verify the various content of My Lessons page", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_pausedPlan = new StudyPlan_PausedPlan();
        login_abh.CommonLogin();
        cy.wait(20000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_pausedPlan.HandlePausedPlan()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_MenuIcon)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Name)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Today_tab)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Upcoming_tab)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Pause_Activate_Button)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Name_In_Footer)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Portion_Progress_Bar)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Time_Progress_Bar)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Manage_and_Create_Plan_button)

    })

    it("3 -AFS-1045 - To Verify user can navigate back to the Landing page", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_pausedPlan = new StudyPlan_PausedPlan();
        login_abh.CommonLogin();
        cy.wait(20000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_pausedPlan.HandlePausedPlan()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_MenuIcon)
        cy.wait(5000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })

    })

    it("4 -AFS-1045- MyLesson-StudyRing - To Verify For a New StudyPlan, User should be shown Study ring in a Default state", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
        login_abh.CommonLogin();
        cy.wait(20000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_Create_abh.Create_New_Study_Plan()
        cy.wait(2000)
        // studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring_Default_Mins)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring_Default_Tasks)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring_Default_Stars)

    })

    it.only("5 -AFS-1045- MyLesson-StudyRing- To Verify For an already existing StudyPlan, User should be shown Study ring with its current progress in a day", () => {
        const Attribute_Name = "aria-label"
        // const Attr_Value_Mins = "14 of 210 mins"
        const Attr_Value_Tasks = "0 of"
        // const Attr_Value_Stars = "2 of 32 stars"
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_pausedPlan = new StudyPlan_PausedPlan();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_pausedPlan.HandlePausedPlan()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        var boo = studyPlan_MyLesson_abh.HandleElement(studyPlan_MyLesson_abh.StudyPlan_Ring_Default_Tasks)
        cy.wait(2000)
        cy.log(boo)
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Todays_Content).then(($ele)=>{
            if (boo[0] == true) {
                genericFunctions_abh.ClickOnFirstElement(studyPlan_MyLesson_abh.Lesson_Dropdown_Btn)
                cy.wait(2000)
                genericFunctions_abh.ClickOnFirstElement(studyPlan_MyLesson_abh.Lesson_MarkAsCompplete_Btn)
            }
        })
        cy.wait(2000)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring)
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Ring_Current_Tasks).then(($ele) => {
            var value = $ele.attr(Attribute_Name)
            expect(value).to.be.not.contain(Attr_Value_Tasks)
        })

    })

    it("9- AFS-1045- MyLesson-StudyRing- To Verify , User should be shown the lesson ring with values X of Y Lressons " +
        "where X is Completed Lesson and Y is Planned Lesson", () => {
            const Attribute_Name = "aria-label"
            const Attr_Value_Tasks = "1 of"
            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh()
            login_abh.CommonLogin();
            cy.wait(10000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            studyPlan_Create_abh.Create_New_Study_Plan()
            cy.wait(5000)
            genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_MenuIcon)
            cy.wait(2000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(2000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            cy.wait(2000)
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring)
            genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring_Default_Tasks)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_MyLesson_abh.StudyPlan_Content_Title_Tab, "1")
            genericFunctions_abh.ClickWithCustomeTime(studyPlan_MyLesson_abh.StudyPlan_Continue_Studying_Btn, "6000000")
            genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Ring_Current_Tasks)
                .invoke('attr', Attribute_Name).should('include', Attr_Value_Tasks)
        })

    it("10- AFS-1045- MyLesson-StudyRing- To Verify , User should be shown the reward ring with values X of Y Stars," +
        " where X is Acheived Star count and Y is Total Star Count achievable in a day", () => {
            const Attribute_Name = "aria-label"
            const Attr_Value_Stars = "1 of"
            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh()
            login_abh.CommonLogin();
            cy.wait(10000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            studyPlan_Create_abh.Create_New_Study_Plan()
            cy.wait(5000)
            genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_MenuIcon)
            cy.wait(2000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(2000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            cy.wait(2000)
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring)
            genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring_Default_Stars)
            cy.wait(2000)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_MyLesson_abh.StudyPlan_Content_Title_Tab, "2")
            cy.wait(2000)
            genericFunctions_abh.ClickOnElementUsingText(" Begin Revision ")
            cy.wait(2000)
            genericFunctions_abh.ClickOnElementUsingTextWithTime(" Continue ", "6000000")
            genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_Revise_Continue_Btn)
            genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_Revise_Continue_Btn)
            cy.wait(5000)
            genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_Revise_Back_Btn)
            genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Ring_Current_Stars)
                .invoke('attr', Attribute_Name).should('include', Attr_Value_Stars)
        })

    it("11- AFS-1045- MyLesson-StudyRing- To Verify User should be shown a Tick Mark on completing todays planned lesson count ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(2000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        studyPlan_MyLesson_abh.StudyPlan_Complete_Todays_Lessons()
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring_TickMark)
    })

    it("12- AFS-1045- MyLesson-StudyRing - To Verify User should not be restricted to complete only the planned lessons" +
        "/Planned StudyTime/Planned Stars count", () => {
            const Attribute_Name = "aria-label"
            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(2000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            cy.wait(2000)
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            cy.wait(2000)
            genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Ring)
            studyPlan_MyLesson_abh.StudyPlan_Complete_Todays_Lessons()
            cy.wait(5000)
            genericFunctions_abh.GetSpecificElementWithTimeout(studyPlan_MyLesson_abh.StudyPlan_Upcoming_Content, "0", "6000000").within(() => {
                genericFunctions_abh.Click(studyPlan_MyLesson_abh.Lesson_Dropdown_Btn)
                // cy.wait(2000)
                genericFunctions_abh.Click(studyPlan_MyLesson_abh.Lesson_MarkAsCompplete_Btn)
            })
            cy.wait(5000)
            genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.Lesson_TickMark).then(($e) => {
                var c = $e.length
                genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Ring_Current_Tasks)
                    .invoke('attr', Attribute_Name).should('include', `${c} of`)
            })
        })

    it("14- AFS-1045- MyLesson-Todays Tab- To Verify User should be shown lessons listed in todays tab", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(2000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Task_To_Complete_Today).contains("tasks to complete today.")
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Todays_Content).each(($ele) => {
            cy.wrap($ele).should("be.visible")
        })
        genericFunctions_abh.GetSpecificElement(studyPlan_MyLesson_abh.Lesson_Dropdown_Btn, "1").parents(studyPlan_MyLesson_abh.StudyPlan_Todays_Content).within(() => {
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.Lesson_Dropdown_Btn)
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.Lesson_MarkAsCompplete_Btn)
        })
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.Lesson_TickMark)

    })

    it("16-AFS-1045- MyLesson-Upcoming Tab Content- To Verify User should be shown lessons listed in Upcoming tab", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(2000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Upcoming_Content).each(($ele) => {

            cy.wrap($ele).should("be.visible")
        })
    })

    it("19-AFS-1045- My Lessons- Highlighted Lesson- To Verify User should be shown a highlighted lesson in todays tab", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(2000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Todays_Content)
            .find(studyPlan_MyLesson_abh.StudyPlan_Highlited_Content).should("be.visible")

    })

    it("20-AFS-1045- My Lessons- Highlighted Lesson-To Verify the highlighted lessons gets changed " +
        "when user complete the previous highlighted less", () => {

            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(2000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            cy.wait(2000)
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            cy.wait(2000)
            genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Highlited_Content).should("be.visible")
            studyPlan_MyLesson_abh.StudyPlan_Complete_Todays_Lessons()
            genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Highlited_Content).should("not.exist")


        })

    it("23-AFS-1045-MyLesson- Unlocked Lesson- To Verify Unlocked lessons are tappable", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh()
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(2000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.IsVisibleForMultiElements(studyPlan_MyLesson_abh.StudyPlan_Unlocked_Dropdown_Btn)
            .parents(studyPlan_MyLesson_abh.StudyPlan_All_Content).click()
        cy.url().should("include", "https://afs-qa-learn.testedgeonline.com/lesson/player?player=")

    })
})
