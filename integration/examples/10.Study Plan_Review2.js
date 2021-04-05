/// <reference types="cypress" />

import 'cypress-wait-until';
import { should } from 'chai';
import { Runnable } from 'mocha';
//Abh
import GenericFunctions_Abh from "../../support/GenericFunctions_Abh";
import StudyPlan_Progress_Abh from "../../support/StudyPlan_progress_Abh";
import StudyPlan_PortionBook_Abh from "../../support/StudyPlan_portion-book_Abh";
import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh"
import StudyPlan_PausedPlan_Abh from "../../support/StudyPlan_Paused-plan_Abh"
import StudyPlan_Myplans_Abh from "../../support/StudyPlan_my-plans_Abh"
import StudyPlan_HomePage_Abh from "../../support/StudyPlan_HomePage_Abh"
import GetUrl_Abh from "../../support/GetUrl_Abh";
import Config_Abh from "../../support/Config_Abh";
import Login_Abh from "../../support/Login_po_Abh";
import Chapters_Abh from "../../support/Chapters_po_Abh";

describe("Study Plan Cases", () => {

    Cypress.config("defaultCommandTimeout", 40000)

    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    it("36 - AFS-1046 - Review Plan-PausePlan - Verify user should be able to pause a plan", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_PausedPlan_abh = new StudyPlan_PausedPlan_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        cy.scrollTo("bottom").wait(1000)
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "2")
        genericFunctions_abh.ClickOnElementUsingText(studyPlan_Progress_abh.Pause_Plan_Proceed_BtnText)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
        cy.wait(2000)
    })

    it("39 - AFS-1046 - Review Plan-PausePlan - Verify Once the active plan is Paused, " +
        "No Mylessons page should be shown to the user", () => {
            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            const studyPlan_PausedPlan_abh = new StudyPlan_PausedPlan_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.GetElement(studyPlan_HomePage_abh.StudyPlanContaingDate_TXT).contains("Paused on")
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
        })

    it("40 - AFS-1046 - Review Plan-PausePlan - Verify Once the active plan is paused , " +
        "no study ring should be shown to the user", () => {

            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            const studyPlan_PausedPlan_abh = new StudyPlan_PausedPlan_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.GetElement(studyPlan_HomePage_abh.StudyPlanContaingDate_TXT).contains("Paused on")
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
            genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Ring).should("not.exist")
        })

    it("41 - AFS-1046 - Review Plan-PausePlan - Verify Once the active plan is paused , , " +
        "user can reactivate it or can activate any other plan as active plan", () => {

            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            const studyPlan_PausedPlan_abh = new StudyPlan_PausedPlan_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
            const studyPlan_Myplans_abh = new StudyPlan_Myplans_Abh();
            const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
            const chapter_abh = new Chapters_Abh();

            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.GetElement(studyPlan_HomePage_abh.StudyPlanContaingDate_TXT).contains("Paused on")
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
            genericFunctions_abh.IsVisibleWithContains(studyPlan_PausedPlan_abh.Resume_Plan_Txt)
            genericFunctions_abh.IsVisibleWithContains(studyPlan_PausedPlan_abh.SelectAnotherPlan_Text)
            genericFunctions_abh.ClickOnElementUsingText(studyPlan_PausedPlan_abh.Resume_Plan_Txt)
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Pause_Activate_Button)
            genericFunctions_abh.ClickOnElementUsingText(studyPlan_Progress_abh.Pause_Plan_Proceed_BtnText)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
            genericFunctions_abh.Click(studyPlan_PausedPlan_abh.MenuIcon)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.GetElement(studyPlan_HomePage_abh.StudyPlanContaingDate_TXT).contains("Paused on")
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
            genericFunctions_abh.ClickOnElementUsingText(studyPlan_PausedPlan_abh.SelectAnotherPlan_Text)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Myplans_abh.MyPlans_Url)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_Myplans_abh.Other_Plans, "0")
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
            genericFunctions_abh.ClickForecefully(studyPlan_Progress_abh.Activate_Plan_Button)
            chapter_abh.StudyPlanNextStep_BTN_Click()
            chapter_abh.StudyPlanNextStep_BTN_Click()
            genericFunctions_abh.Click(studyPlan_Create_abh.First_Feasible_Date)
            chapter_abh.StudyPlanNextStep_BTN_Click()
            studyPlan_Create_abh.ActivePlan_BTN_Click()
            studyPlan_Create_abh.BeginStudying_BTN_Click()
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
        })

    it("37 - AFS-1046 - Review Plan-PausePlan - Verify User should be able to Activate the Pause Plan", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_PausedPlan_abh = new StudyPlan_PausedPlan_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        genericFunctions_abh.GetCurrentPageUrl().then(($el) => {
            if ($el.includes("paused-plan")) {
                genericFunctions_abh.ClickOnElementUsingText(studyPlan_PausedPlan_abh.Resume_Plan_Txt)
            }
        })
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        cy.scrollTo("bottom").wait(1000)
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "2")
        genericFunctions_abh.ClickOnElementUsingText(studyPlan_Progress_abh.Pause_Plan_Proceed_BtnText)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
        genericFunctions_abh.ClickOnElementUsingText(studyPlan_PausedPlan_abh.Resume_Plan_Txt)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
    })

    it("38 - AFS-1046 - Review Plan-PausePlan - Verify user should be able to Activate " +
        "any other plan as an active plan", () => {

            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            const studyPlan_PausedPlan_abh = new StudyPlan_PausedPlan_Abh();
            const studyPlan_MyPlans_abh = new StudyPlan_Myplans_Abh();
            const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
            const chapter_abh = new Chapters_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
            cy.scrollTo("bottom").wait(1000)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "2")
            genericFunctions_abh.ClickOnElementUsingText(studyPlan_Progress_abh.Pause_Plan_Proceed_BtnText)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PausedPlan_abh.PausedPlan_Url)
            genericFunctions_abh.IsVisibleWithContains(studyPlan_PausedPlan_abh.SelectAnotherPlan_Text)
            genericFunctions_abh.ClickOnElementUsingText(studyPlan_PausedPlan_abh.SelectAnotherPlan_Text)
            genericFunctions_abh.IsVisible(studyPlan_MyPlans_abh.Other_Plans)
            genericFunctions_abh.ClickOnSingleElement(studyPlan_MyPlans_abh.Other_Plans, "0")
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
            cy.scrollTo("bottom").wait(1000)
            genericFunctions_abh.Click(studyPlan_Progress_abh.Activate_Plan_Button)
            chapter_abh.StudyPlanNextStep_BTN_Click()
            chapter_abh.StudyPlanNextStep_BTN_Click()
            genericFunctions_abh.Click(studyPlan_Create_abh.First_Feasible_Date)
            chapter_abh.StudyPlanNextStep_BTN_Click()
            studyPlan_Create_abh.ActivePlan_BTN_Click()
            studyPlan_Create_abh.BeginStudying_BTN_Click()
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
        })
})